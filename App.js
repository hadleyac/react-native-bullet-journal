/*
TODO

Functionality
[] fix text fields on android
[] edit notes
[] fix swipe loading
[] add time note was created
[] edit note
[] consolidate rendering for AddNoteModal
[] cleanup deleteNote method
[] Check if I need to add vibration permissions to android manifest.xml
[] swip list items for more options
[] On login screen, touchableOpacity not working with absolute positioning


Clean Code and extensibility:
[] Make component export locations consistent

Styling
[] render icon for important and inspiration
[] Fix styling for important and inspiration toggles
[] if note names are too long, they should wrap to the next line

icons: https://materialdesignicons.com/

swipable tabs: https://github.com/react-native-community/react-native-tab-view
icons: https://material.io/resources/icons/?style=baseline
*/


import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
} from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import moment from 'moment';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase';

import PagesTabView from './components/PagesTabView';
import SignupScreen from './components/auth/SignupScreen'
import ForgotPasswordScreen from './components/auth/ForgotPasswordScreen'
import LoginScreen from './components/auth/LoginScreen'



const LoginNavigator = createStackNavigator({
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      header: null,
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    }
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: {
      header: null,
    }
  }
});

const Login = createAppContainer(LoginNavigator);



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationReady: false,
      isAuthenticated: false,
      currentPage: 0,
      pages: [
        {
          title: "First Page",
          key: "first",
          date: new moment().format(),
          key: new moment().format('dhms'),
          notes: [0, 1, 2]
        }

      ],
      notes: {
        //this is an example of a note
        0: {
          type: 'note',
          content: 'I am a note',
          important: true,
          inspiration: false,
          bodyText: 'I can have optional text in the body'
        },
        //this is an example of a task. There will be more "note" types in the future. 
        1: {
          type: 'task',
          content: 'I am a task. Tap me to mark complete',
          complete: false,
          important: false,
          inspiration: true
        },
        2: {
          type: 'task',
          content: 'Long-press and drag to rearrange us!',
          complete: false,
          important: false,
          inspiration: true
        }
      },
      noteID: 3,
    }
    //Leaving these here for now, need to research why I'm getting an error when using async with arrow functions
    this.deleteNote = this.deleteNote.bind(this);
    this.deletePage = this.deletePage.bind(this);


    //Initialize Firebase if not done already
    if (!firebase.apps.length) firebase.initializeApp(ApiKeys.firebaseConfig);
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
    // this.getState()
    this.fetchRemoteData()

  }

  signOut = () => {
    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
        //Clear local storage
        // AsyncStorage.clear()
        console.log('sign out successful')
        console.log('resetting state')
      }).catch(function (error) {
        // An error happened.
        console.log('error in signout')
      });
  }

  savePage = (page) => {
    console.log(page)
    const editPage = this.props.editPage;

    //if editPage is empty, append a new page
    if (Object.keys(editPage).length === 0) {
      this.setState({ pages: [...this.state.pages, { ...page, notes: [] }], currentPage: this.state.pages.length }, async () => {
        await this.saveState();
        this.saveRemoteData();
      })
    }
    //Otherwise, we are editing an existing page
    else {
      const newPages = [...this.state.pages];
      for (let i = 0; i < newPages.length; i++) {
        if (newPages[i].key === page.key) {
          newPages[i] = page;
          console.log('edited page', newPages[i])
        }
      }
      //Set the state, and then reset editPage back to a blank object
      this.setState({ pages: newPages }, async () => {
        console.log('savePage: saving edited page')
        this.props.setEditPage({});
        await this.saveState();
        this.saveRemoteData();
      })
    }
  }

  onIndexChange = (index) => {
    this.setState({ currentPage: index })
  }

  onMoveEnd = (newPageNoteOrder) => {
    const newPages = [...this.state.pages]
    const newPage = newPages[this.state.currentPage]
    newPage.notes = newPageNoteOrder;
    this.setState({
      pages: newPages
    }, async () => {
      await this.saveState();
      this.saveRemoteData();
    })
  }
  onPressTaskRadioButton = (id) => {
    this.setState({
      notes: {
        ...this.state.notes,
        [id]: {
          ...this.state.notes[id],
          complete: !this.state.notes[id].complete
        }
      }
    }, async () => {
      await this.saveState()
      this.saveRemoteData()
    })
  }

  saveNote = (note) => {
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
      console.log(newPage.notes)

      //Added this if/else to solve problem of undefined array
      if (newPage.notes) {
        newPage.notes = [...newPage.notes, noteID];
      } else {
        newPage.notes = [noteID]
      }
      newPages[currentPage] = newPage;
      this.setState({
        pages: newPages
      }, () => {
        //increment noteID
        this.setState({
          noteID: noteID + 1
        }, async () => {
          //save to local and remote storage
          await this.saveState()
          this.saveRemoteData();

        })
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
    this.setState(newState, async () => {
      //save to local and remote storage
      await this.saveState()
      this.saveRemoteData();
    })
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
        await this.saveState()
        this.saveRemoteData();
      })
    }
  }

  async componentDidMount() {
    // await this.getState()
  }
  //FIREBASE STORAGE METHODS
  async fetchRemoteData() {
    if (this.state.isAuthenticated) {
      let userID = firebase.auth().currentUser.uid
      console.log('fetching data')
      console.log(userID)
      firebase.database().ref('users/' + userID).on("value", async (snapshot) => {

        //if we get a result, set state and save to local storage
        if (snapshot.val() !== null) {
          const { notes, noteID, pages } = snapshot.val();
          this.setState({ notes: notes, noteID: noteID, pages: pages }, async () => {
            console.log('fetchRemoteData: state set')
            console.log('fetchRemoteData: callback saving to local storage')

            //save to local storage
            // await this.saveState()

          })
        }
      }, async (error) => {
        console.log("Error: " + error.code);
        //save to local storage
        console.log('fetchRemoteData: callback (fallback) saving to local storage')
        // await this.saveState()
      });
    }

  }

  async saveRemoteData() {
    //pages
    //notes
    //nodeID
    if (this.state.isAuthenticated) {
      console.log('saveRemoteData: ')
      console.log(this.state.pages)
      console.log(this.state.notes)
      console.log(this.state.noteID)
      let userID = firebase.auth().currentUser.uid
      firebase.database().ref('users/' + userID).set({
        pages: this.state.pages,
        notes: this.state.notes,
        noteID: this.state.noteID,
      })
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
    if (this.state.isAuthenticated) {
      const userID = firebase.auth().currentUser.uid
      await this.saveData(userID, this.state)
      console.log('saveState: saved to local storage')
    }
  }

  async getState() {
    if (this.state.isAuthenticated) {
      console.log(this.state.isAuthenticated)
      const userID = firebase.auth().currentUser.uid
      const appState = await this.getData(userID)
      this.setState(appState)

    }
  }


  render() {
    if (this.state.isAuthenticated) {
      return (
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
          {/* FOR TESTING */}
          <Button onPress={() => {
            AsyncStorage.clear();
          }}> </Button>
          {/* <Button onPress={() => {
            console.log('pages', this.state.pages)
          }}>log pages</Button> */}
          {/* <Button
            onPress={() => this.signOut()}>
            TEST FIREBASE SIGNOUT
          </Button> */}
          {/* <Button onPress={() => { this.saveRemoteData() }}>
            Save Remote Data
          </Button> */}
          {/* <Button onPress={() => { this.fetchRemoteData() }}>
            Fetch Remote Data
          </Button> */}
        </SafeAreaView>

      )
    } else {
      return (
        <>
          <Login />
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