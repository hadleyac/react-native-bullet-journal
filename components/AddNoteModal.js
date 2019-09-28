import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Paragraph, Portal, Modal, Switch, TextInput} from 'react-native-paper';
import { Keyboard, KeyboardAvoidingView, View, Platform, Text} from 'react-native';

function AddNoteModal({isDialogVisible, hideDialog, noteType, saveNote}) {

  let textInputRef = useRef(null)

  const [contentText, setContentText] = useState('');

  //Extra note signifiers
  const [important, setImportant] = useState(false);
  const [inspiration, setInspiration] = useState(false);
  const toggleImportant = () => {setImportant(!important)};
  const toggleInspiration = () => {setInspiration(!inspiration)};
  // const [keyboardHeightOffset, setKeyboardHeightOffset] = useState(0)

  const onPressAddNoteButton = () => {
    hideDialog();
    if (contentText) {
      const note = {
        type: 'note',
        content: contentText,
        important : important,
        inspiration : inspiration
      }
      saveNote(note);
      console.log('added note');
      resetInput();
    }
  }
  const onPressAddTaskButton = () => {
    hideDialog();
    if (contentText) {
      const task = {
        type: 'task',
        content: contentText,
        complete: false,
        important : important,
        inspiration : inspiration
      }
      saveNote(task);
      console.log('added task');
      resetInput();
    }
  }

  //reset everything after adding a note
  const resetInput = () => {
    setContentText('');
    setImportant(false);
    setInspiration(false);
  }

  // const keyboardDidShow = (e) => {
  //   setKeyboardHeightOffset(e.endCoordinates.height-100)
  // }

 
  useEffect(()=>{
     //Will focus the textInput box if the modal is visible
    if (isDialogVisible) {
      setTimeout(() => {
        textInputRef.current.focus()
      }, 300);
    }

    // keyBoardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
  },[isDialogVisible])


  if (noteType === 'note') {
    return (    
      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={hideDialog}
          style={{top: -100}}
          >
          <Dialog.Title>New Note</Dialog.Title>
          <Dialog.Content avoidKeyboard>
            <TextInput 
              ref={textInputRef}
              label='type your note'
              mode='outlined'
              value={contentText}
              onChangeText={text => setContentText(text)}
              />
          <Text>Important</Text> 
          <Switch
            value={important}
            onValueChange={toggleImportant}
          />
          <Text>Inspiration</Text>
          <Switch
            value={inspiration}
            onValueChange={toggleInspiration}
          />          
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
            onPress={onPressAddNoteButton}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  } 

  else if (noteType === 'task') {
    return (
      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={hideDialog}
          style={{top: -100}}
          >
          <Dialog.Title>New Task</Dialog.Title>
          <Dialog.Content avoidKeyboard>
            <TextInput 
              ref={textInputRef}
              label='type your task'
              mode='outlined'
              value={contentText}
              onChangeText={text => setContentText(text)}
              />
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
            onPress={onPressAddTaskButton}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }

}

export default AddNoteModal
