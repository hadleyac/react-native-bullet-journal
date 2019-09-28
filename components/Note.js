import React from 'react'
import { List, Button } from 'react-native-paper';

function Note({note}) {
  const { content, important, inspiration } = note;
  return (
   <List.Item 
    title={content + ' ' + important + ' ' + inspiration}
    left={props => <List.Icon {...props} icon="remove" />}
   /> 

   
  )
}

export default Note
