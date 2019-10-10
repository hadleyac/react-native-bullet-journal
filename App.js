/*
TODO

Functionality
[] edit notes
[] fix swipe loading

[x] pagination. With the date at the top of each page.
[] menu to add a new page. Date is defaulted at today, but you can pick them
[] add time note was created
[] edit note
[] consolidate rendering for AddNoteModal
[] cleanup deleteNote method
[] Check if I need to add vibration permissions to android manifest.xml
[] swip list items for more options
[] Add firebase back end



Styling
[] render icon for important and inspiration
[] Fix styling for important and inspiration toggles
[x] page should be scrollable
[] if note names are too long, they should wrap to the next line


swipable tabs: https://github.com/react-native-community/react-native-tab-view
icons: https://material.io/resources/icons/?style=baseline
*/


import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  StatusBar,
  SafeAreaView,
  InteractionManager
} from 'react-native';
import Constants from 'expo-constants';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';

import Page from './components/Page';
import PagesTabView from './components/PagesTabView';
import moment from 'moment';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      pages: [
        // {
        //   title: "First Page",
        //   key: "first",
        //   date: (date object)
        //   //key needs to contain no spaces in order to work with the TabView
        //   notes: [0, 1]
        // },
        // {
        //   title: "Second Page",
        //   key: "second",
        //   //key needs to contain no spaces in order to work with the TabView
        //   notes: []
        // },
        // {
        //   title: "Third Page",
        //   key: "third",
        //   //key needs to contain no spaces in order to work with the TabView
        //   notes: []
        // },
        // {
        //   title: "Fourth Page",
        //   key: "fourth",
        //   //key needs to contain no spaces in order to work with the TabView
        //   notes: []
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
      noteID: 2

    }
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onPressTaskRadioButton = this.onPressTaskRadioButton.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.onIndexChange = this.onIndexChange.bind(this);
    this.checkFirstTimeSetup = this.checkFirstTimeSetup.bind(this);
    this.addPage = this.addPage.bind(this);


    this.theme = {
      ...DefaultTheme,
      // roundness: 10,
      colors: {
        ...DefaultTheme.colors,
        primary: '#f50057',
        accent: '#f50057',
      }
    };
  }

  checkFirstTimeSetup() {
    if (this.state.pages.length === 0) {
      this.addPage();
    }
  }
  addPage() {
    console.log('adding page')
    const timeStamp = new moment()
    console.log('created timestamp')
    const starterPage = {
      date: timeStamp,
      title: timeStamp.format('ddd d/M/YY'),
      key: timeStamp.format('dhms'),
      notes: [],
    }

    this.setState({ pages: [...this.state.pages, starterPage], currentPage: this.state.pages.length }, () => { this.saveState() })
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
  deleteNote(id) {
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

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getState()
      this.checkFirstTimeSetup()
    })
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
    return (
      <PaperProvider theme={this.theme}>
        <SafeAreaView style={styles.container}>
          <PagesTabView
            addPage={this.addPage}
            currentPage={this.state.currentPage}
            pages={this.state.pages}
            onIndexChange={this.onIndexChange}
            notes={this.state.notes}
            onPressTaskRadioButton={this.onPressTaskRadioButton}
            saveNote={this.saveNote}
            deleteNote={this.deleteNote}
            onMoveEnd={this.onMoveEnd}
          />
          <Button onPress={() => {
            AsyncStorage.clear();
          }}>clear storage</Button>
        </SafeAreaView>
      </PaperProvider>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flex: 1,
  }
})
