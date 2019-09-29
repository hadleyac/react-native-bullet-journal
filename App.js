/*
TODO
[x] stub outline of what my data will look like
[x] make Page component
[x] make note component
[x] make task component
[] fix icons for notes and task components
[x]floating action button that gives user choice of journal entries
  [x]todo
  [x]note  
[x] textInput in modal is focused by default
[x] modal respects keyboard location
  [] fix ongoing connection reset error in expo
  
Functionality
[x] save notes to local storage
[x] delete notes
[] scrollView should not reset after checking of an item (minimize re-renders?)
  [x] changed to FlatList
[] edit notes
[] drag and drop note positions
[] pagination. With the date at the top of each page.
[] menu to add a new page. Date is defaulted at today, but you can pick them
[] add time note was created
[] edit note
[] consolidate rendering for AddNoteModal
[] cleanup deleteNote method



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
  SafeAreaView, 
  Text, 
  View, 
  AsyncStorage
} from 'react-native';
import Constants from 'expo-constants';
import {Provider as PaperProvider } from 'react-native-paper';
const shortid = require('shortid')
// import AsyncStorage from '@react-native-community/async-storage';

import Page from './components/Page'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      pages: [{
        title: "first page", 
        notes: [0,1]
      }],
      notes: {
        //this is an example of a note
        0: {
          type: 'note',
          content: 'this is a note',
          important : true,
          inspiration : false

          
        },
        //this is an example of a task. There will be more "note" types in the future. 
        1: {
          type: 'task',
          content: 'this is a task',
          complete: false,
          important : false,
          inspiration : true
        }
      },
      noteID: 2

    }
    this.onPressTaskRadioButton = this.onPressTaskRadioButton.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  onPressTaskRadioButton(id) {
    this.setState({
      notes: {
        ...this.state.notes,
        [id] : {
          ...this.state.notes[id],
          complete: !this.state.notes[id].complete
        }
      }
    }, () => this.saveState())
  }

  saveNote(note) {
    //add a new note with the current noteID
    this.setState({
      notes: {
        ...this.state.notes, 
        [this.state.noteID] : note
      }   
    }, ()=>{
      //add the noteID to the current page's notes array
      const { noteID, pages, currentPage } = this.state;
      const newPages = [...pages];
      const newPage = {...newPages[currentPage]};
      newPage.notes = [...newPage.notes, noteID];
      newPages[currentPage] = newPage;
      this.setState({ 
        pages: newPages
      }, ()=> {
        //increment noteID
        this.setState({
          noteID: noteID+1
          //save to local storage
      }, ()=>{this.saveState()})} )}) 
  }

  //TODO: cleanup this method
  deleteNote(id) {
    const {currentPage} = this.state;

    const newState = {...this.state};
    const newPages = [...newState.pages]
    const newPage = newPages[currentPage]
    const targetIndex = newPage.notes.indexOf(id)
    newPage.notes.splice(targetIndex, 1)

    const newNotes = {...newState.notes}
    delete newNotes[id];

    newState.pages = newPages;
    newState.notes = newNotes
    this.setState(newState)
  }

  componentDidMount(){
    this.getState()
  
  }

//LOCAL STORAGE METHODS
  async saveData (key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log('error saving data', error)
    }
  }

  async getData (key) {
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
      <PaperProvider>
        <View style={styles.container}> 
        {/* {this.state.pages.map( (page, index) => <Page 
          page={page} 
          notes={this.state.notes} 
          key={shortid.generate()}
          onPressTaskRadioButton={this.onPressTaskRadioButton}
          saveNote={this.saveNote}
          deleteNote={this.deleteNote}
          />)} */}
          <Page 
          page={this.state.pages[0]} 
          notes={this.state.notes} 
          // key={shortid.generate()}
          onPressTaskRadioButton={this.onPressTaskRadioButton}
          saveNote={this.saveNote}
          deleteNote={this.deleteNote}
          />
        </View>
      </PaperProvider>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1, 
    // alignItems: 'center', 
    // justifyContent: 'center',
  },
  inputStyle: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1
  }

})
