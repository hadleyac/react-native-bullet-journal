import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Paragraph, Portal, TextInput} from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native';

function AddNoteModal({isDialogVisible, hideDialog, noteType, saveNote}) {

  let textInputRef = useRef(null)
  // let textInputRef = null;

  const [contentText, setContentText] = useState('');

  const onPressAddNoteButton = () => {
    hideDialog();
    if (contentText) {
      const note = {
        type: 'note',
        content: contentText
      }
      saveNote(note);
      console.log('added note');
      setContentText('');
    }
  }
  const onPressAddTaskButton = () => {
    hideDialog();
    if (contentText) {
      const task = {
        type: 'task',
        content: contentText,
        complete: false
      }
      saveNote(task);
      console.log('added task');
      setContentText('');
    }
  }

 
  useEffect(()=>{
     //Will focus the textInput box if the modal is visible
    if (isDialogVisible) {
      setTimeout(() => {
        textInputRef.current.focus()
      }, 300);
    }
  },[isDialogVisible])


  if (noteType === 'note') {
    return (
      <KeyboardAvoidingView behavior='padding'>
        <Portal>
          <Dialog
            visible={isDialogVisible}
            onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This will be a note</Paragraph>
              <TextInput 
                ref={textInputRef}
                label='type your note'
                value={contentText}
                onChangeText={text => setContentText(text)}
                />
            </Dialog.Content>
            <Dialog.Actions>
              <Button 
              onPress={onPressAddNoteButton}
              >
                Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </KeyboardAvoidingView>
    )
  } 

  else if (noteType === 'task') {
    return (
      <Portal>
      <Dialog
         visible={isDialogVisible}
         onDismiss={hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This will be a task</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
    )
  }

}



export default AddNoteModal
