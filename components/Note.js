import React from 'react'
import { List, Button, IconButton } from 'react-native-paper';

function Note({note, noteID, deleteNote}) {
  const { content, important, inspiration} = note;
  return (
   <List.Item 
    title={content + ' ' + important + ' ' + inspiration}
    left={props => <List.Icon {...props} icon="remove" />}
    right={() => <IconButton icon="edit" onPress={()=>{deleteNote(noteID)}}/>}
   /> 

   
  )
}

export default Note
