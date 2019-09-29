import React from 'react'
import { List, Button, IconButton } from 'react-native-paper';

function Note({ note, noteID, deleteNote }) {
  const { content, important, inspiration } = note;
  return (
    <List.Item
      title={content + ' ' + important + ' ' + inspiration}
      description="this is a description"
      // titleStyle={{ flexWrap: 'wrap', flex: 1 }}
      left={() => <IconButton size={12} icon="remove" disabled />}
      right={() => <IconButton icon="delete" size={16} onPress={() => { deleteNote(noteID) }} />}
    />


  )
}

export default Note
