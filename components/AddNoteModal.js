import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Paragraph, Portal, Modal, TextInput} from 'react-native-paper';
import { Keyboard, KeyboardAvoidingView, StyleSheet, View, Platform} from 'react-native';

function AddNoteModal({isDialogVisible, hideDialog, noteType, saveNote}) {

  let textInputRef = useRef(null)

  const [contentText, setContentText] = useState('');
  // const [keyboardHeightOffset, setKeyboardHeightOffset] = useState(0)

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
                  {/* <View style={styles.container}> */}
          <Dialog.Title>New Note</Dialog.Title>
          <Dialog.Content avoidKeyboard>
            <TextInput 
              ref={textInputRef}
              label='type your note'
              mode='outlined'
              value={contentText}
              onChangeText={text => setContentText(text)}
              />
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
            onPress={onPressAddNoteButton}
            >
              Done
            </Button>
          </Dialog.Actions>
  {/* </View> */}
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
        >
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

const styles = StyleSheet.create({
  container: {
  }
})


export default AddNoteModal
