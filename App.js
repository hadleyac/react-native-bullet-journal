/*
TODO
[x] stub outline of what my data will look like
[x] make Page component
[] make note component
[] make task component
[]floating action button that gives user choice of journal entries
  []todo
  []note
[] pagination. With the date at the top of each page.
[] menu to add a new page. Date is defaulted at today, but you can pick them

*/


import React, { useState } from 'react';
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

import Page from './components/Page'


export default function App() {

  //This will increment whenever a new note is created. 
  const [noteId, setNoteId] = useState(0);
  //This is going to keep the order of our pages
  const [pages, setPages] = useState([{
    title: "first page", 
    notes: [0,1]
  }
])
//this is our list of notes. Each page will have a reference to these.
const [notes, setNotes] = useState({
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
})

  const [currentPage, setCurrentPage] = useState(0);
  const [tasks, setTasks] = useState(['first task'])
  const [inputText, setInputText] = useState('')

  const onAddButtonPress = () => {
    if (inputText !== '') {
      setTasks([...tasks, inputText]);
      setInputText('');
    }
  }
  return (
    // <SafeAreaView>
    <View style={styles.container}> 
      <Text>This is my fantastic app</Text>
      <TextInput 
        label='type a task'
        onChangeText={text => setInputText(text)}
        value={inputText}
      />
      <Button icon="send" mode="contained" onPress={onAddButtonPress}>
        Press me
      </Button>
      {tasks.map( (task, index) => <Text key={index}>{task}</Text>)}
      {pages.map( (page, index) => <Page page={page} notes={notes} key={index}/>)}
    </View>
    // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
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
