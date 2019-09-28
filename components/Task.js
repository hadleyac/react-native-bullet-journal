import React from 'react'
import { 
  List, 
  Button, 
  Checkbox, 
  RadioButton,
 } from 'react-native-paper';
import { 
  StyleSheet
} from 'react-native';


function Task({noteID, content, complete, onPressTaskRadioButton}) {
  return (
    <List.Item 
    title={content}
    titleStyle={complete ? styles.complete: styles.none}
    left={props => <RadioButton.Android 
      value="ur mum"
      status={complete ? 'checked' : 'unchecked'}
      onPress={()=>{onPressTaskRadioButton(noteID)} }
      />}
   /> 
  )
}

export default Task


const styles = StyleSheet.create({
  complete: {
    color: 'grey',
    textDecorationLine: 'line-through'
  },
  none: {}
})
