/*
TODO
[x] stub outline of what my data will look like
[x] make Page component
[] make note component
[] make task component
[] fix icons for notes and task components
[]floating action button that gives user choice of journal entries
  []todo
  []note
[] pagination. With the date at the top of each page.
[] menu to add a new page. Date is defaulted at today, but you can pick them

*/


import React, { useState, Component } from 'react';
import { 
  StyleSheet,
  SafeAreaView, 
  Text, 
  // TextInput, 
  View, 
  // Button 
} from 'react-native';
import Constants from 'expo-constants';
import { Button, TextInput, List } from 'react-native-paper';
const shortid = require('shortid')

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
          content: 'this is a note'
          
        },
        //this is an example of a task. There will be more "note" types in the future. 
        1: {
          type: 'task',
          content: 'this is a task',
          complete: false
        }
      },
      noteID: 0

    }
    this.onPressTaskRadioButton = this.onPressTaskRadioButton.bind(this);
  }

  onPressTaskRadioButton(id) {
    const newState = {
      ...this.state,
      notes: {
        ...this.state.notes,
        [id] : {
          ...this.state.notes[id],
          complete: !this.state.notes[id].complete
        }
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <View style={styles.container}> 
      <Text>This is my fantastic app</Text>
      {this.state.pages.map( (page, index) => <Page 
        page={page} 
        notes={this.state.notes} 
        key={shortid.generate()}
        onPressTaskRadioButton={this.onPressTaskRadioButton}
        />)}
    </View>
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
