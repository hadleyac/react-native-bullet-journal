import React from 'react'
import { List, Button } from 'react-native-paper';

function Note({content}) {
  return (
   <List.Item 
    title={content}
    left={props => <List.Icon {...props} icon="remove" />}
   /> 

   
  )
}

export default Note
