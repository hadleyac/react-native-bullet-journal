import React from 'react'
import {
  List,
  Button,
  Checkbox,
  RadioButton,
  IconButton
} from 'react-native-paper';
import {
  StyleSheet,
  Text
} from 'react-native';


function Task({ noteID, note, onPressTaskRadioButton, deleteNote }) {
  const { complete, content, important, inspiration } = note;
  return (
    <List.Item
      title={content + ' ' + important + ' ' + inspiration}
      titleStyle={complete ? styles.complete : styles.none}
      left={() => <IconButton size={12} icon="lens" disabled />}
      right={() => <IconButton icon="edit" onPress={() => { deleteNote(noteID) }} />}
    />
  )
}

export default Task


const styles = StyleSheet.create({
  complete: {
    color: 'grey',
    textDecorationLine: 'line-through',
    // flexDirection: 'row'
  },
  none: {
    // flexDirection: 'row'
  }
})
