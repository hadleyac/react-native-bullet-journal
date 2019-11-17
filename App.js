/*
TODO

Functionality
[] edit notes
[] fix swipe loading
[] add time note was created
[] edit note
[] consolidate rendering for AddNoteModal
[] cleanup deleteNote method
[] Check if I need to add vibration permissions to android manifest.xml
[] swip list items for more options
[] Add firebase back end

Clean Code and extensibility:
[] Make component export locations consistent

Styling
[] render icon for important and inspiration
[] Fix styling for important and inspiration toggles
[] if note names are too long, they should wrap to the next line


swipable tabs: https://github.com/react-native-community/react-native-tab-view
icons: https://material.io/resources/icons/?style=baseline
*/


import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import moment from 'moment';
import { BreadProvider } from "material-bread";

import PagesTabView from './components/PagesTabView';
import DrawerPage from './components/DrawerPage';
import SignupScreen from './components/auth/SignupScreen'
import ForgotPasswordScreen from './components/auth/ForgotPasswordScreen'
import LoginScreen from './components/auth/LoginScreen'

import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: false,
      currentPage: 0,
      pages: [
        // {
        //   title: "First Page",
        //   key: "first",
        //   date: new moment(),
        //   //key needs to contain no spaces in order to work with the TabView
        //   notes: [0, 1]
        // }

      ],
      notes: {
        //this is an example of a note
        0: {
          type: 'note',
          content: 'this is a note',
          important: true,
          inspiration: false


        },
        //this is an example of a task. There will be more "note" types in the future. 
        1: {
          type: 'task',
          content: 'this is a task',
          complete: false,
          important: false,
          inspiration: true
        }
      },
      noteID: 2,
      pageInsertionIndex: -1,

    }
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onPressTaskRadioButton = this.onPressTaskRadioButton.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.onIndexChange = this.onIndexChange.bind(this);
    this.checkFirstTimeSetup = this.checkFirstTimeSetup.bind(this);
    this.savePage = this.savePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

    //Initialize Firebase if not done already
    if (!firebase.apps.length) firebase.initializeApp(ApiKeys.firebaseConfig);
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged(user) {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
  }

  signOut = () => {
    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
        console.log('sign out successful')
      }).catch(function (error) {
        // An error happened.
        console.log('error in signout')
      });
  }

  checkFirstTimeSetup() {
    if (this.state.pages.length === 0) {
      const timeStamp = new moment();
      const page = {
        date: timeStamp,
        title: timeStamp.format('ddd d/M/YY'),
        key: timeStamp.format('dhms'),
        notes: [],
      }
      this.savePage(page);
    }
  }
  savePage(page) {
    const editPage = this.props.editPage;

    //if editPage is empty, append a new page
    if (Object.keys(editPage).length === 0) {
      this.setState({ pages: [...this.state.pages, page], currentPage: this.state.pages.length }, () => { this.saveState() })
    }
    //Otherwise, we are editing an existing page
    else {
      const newPages = [...this.state.pages];
      for (let i = 0; i < newPages.length; i++) {
        if (newPages[i].key === page.key) {
          newPages[i] = page;
        }
      }
      //Set the state, and then reset editPage back to a blank object
      this.setState({ pages: newPages }, () => { this.props.setEditPage({}); this.saveState(); })
    }
  }

  onIndexChange(index) {
    this.setState({ currentPage: index })
  }

  onMoveEnd(newPageNoteOrder) {
    const newPages = [...this.state.pages]
    const newPage = newPages[this.state.currentPage]
    newPage.notes = newPageNoteOrder;
    this.setState({
      pages: newPages
    }, () => this.saveState())
  }
  onPressTaskRadioButton(id) {
    this.setState({
      notes: {
        ...this.state.notes,
        [id]: {
          ...this.state.notes[id],
          complete: !this.state.notes[id].complete
        }
      }
    }, () => this.saveState())
  }

  saveNote(note) {
    // add a new note with the current noteID
    this.setState({
      notes: {
        ...this.state.notes,
        [this.state.noteID]: note
      }
    }, () => {
      //add the noteID to the current page's notes array
      const { noteID, pages, currentPage } = this.state;
      const newPages = [...pages];
      const newPage = { ...newPages[currentPage] };
      newPage.notes = [...newPage.notes, noteID];
      newPages[currentPage] = newPage;
      this.setState({
        pages: newPages
      }, () => {
        //increment noteID
        this.setState({
          noteID: noteID + 1
          //save to local storage
        }, () => { this.saveState() })
      })
    })
  }

  //TODO: cleanup this method
  async deleteNote(id) {
    const { currentPage } = this.state;
    const newState = { ...this.state };
    const newPages = [...newState.pages]
    const newPage = newPages[currentPage]
    const targetIndex = newPage.notes.indexOf(id)
    newPage.notes.splice(targetIndex, 1)

    const newNotes = { ...newState.notes }
    delete newNotes[id];

    newState.pages = newPages;
    newState.notes = newNotes
    this.setState(newState, () => this.saveState())
  }

  //TODO: separate this method into several smaller methods
  async deletePage(key) {
    if (this.state.pages.length > 1) {
      let notesToDelete;
      let deleteIndex;
      const newPages = [...this.state.pages];
      for (let i = 0; i < newPages.length; i++) {
        if (newPages[i].key === key) {
          notesToDelete = newPages[i].notes.slice();
          deleteIndex = i;
          break;
        }
      }
      newPages.splice(deleteIndex, 1);

      let newCurrentPage = this.state.currentPage;
      //if we are deleting the current page
      if (newCurrentPage === deleteIndex) {
        //if it's not the first page, always go back one page
        if (newCurrentPage !== 0) {
          newCurrentPage -= 1;
        }
      }
      //if the page we are deleting is behind the current page, decrement the current page index. 
      else if (deleteIndex < newCurrentPage) {
        newCurrentPage -= 1
      }

      // this.setState({ pages: newPages, currentPage: newCurrentPage }, () => { this.saveState() })
      console.log(this.state.notes)
      this.setState({ pages: newPages, currentPage: newCurrentPage }, async () => {
        for (let i = 0; i < notesToDelete.length; i++) {
          console.log(notesToDelete[i])
          await this.deleteNote(notesToDelete[i])
        }
        console.log(this.state.notes)
        this.saveState();
      })

    }

  }

  async componentDidMount() {
    await this.getState()
    this.checkFirstTimeSetup()


    //Firebase experimentation
    if (this.isAuthenticated) {
      firebase.database().ref('users/' + 'testman').set({
        highscore: 8
      });
    }
  }

  //LOCAL STORAGE METHODS
  async saveData(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log('error saving data', error)
    }
  }

  async getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value)
      }
    } catch (error) {
      console.log('error getting data', error)
    }
  }

  async saveState() {
    this.saveData('appState', this.state)
  }

  async getState() {
    const appState = await this.getData('appState')
    this.setState(appState)
  }


  render() {
    if (this.state.isAuthenticated) {
      return (
        // <SafeAreaView style={styles.container}>
        //   <View>
        //     <DrawerPage />
        //   </View>
        // </SafeAreaView>


        //OLD
        <SafeAreaView style={styles.container}>
          <PagesTabView
            savePage={this.savePage}
            currentPage={this.state.currentPage}
            pages={this.state.pages}
            onIndexChange={this.onIndexChange}
            notes={this.state.notes}
            onPressTaskRadioButton={this.onPressTaskRadioButton}
            saveNote={this.saveNote}
            deleteNote={this.deleteNote}
            onMoveEnd={this.onMoveEnd}
            deletePage={this.deletePage}
          />
          {/* <Button onPress={() => {
            AsyncStorage.clear();
          }}>clear storage</Button>
          <Button onPress={() => {
            console.log('pages', this.state.pages)
          }}>log pages</Button> */}
          <Button
            onPress={() => this.signOut()}>
            TEST FIREBASE SIGNOUT
          </Button>
          <Button
            onPress={() => {
              firebase.database().ref('users/' + 'testman').set({
                highscore: 8
              });
            }}
          >
            TEST DB
          </Button>
        </SafeAreaView>

      )
    } else {
      return (
        <>
          <LoginScreen />
        </>


      )
    }

  }
}


const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flex: 1,
  }
})

const mapStateToProps = (state) => {
  return {
    editPage: state.editPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEditPage: (targetPage) => dispatch({ type: 'SET_EDIT_PAGE', value: targetPage }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)