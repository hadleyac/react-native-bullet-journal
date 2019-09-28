import React, { useState } from 'react'
import { Button, Dialog, Paragraph, Portal, TextInput} from 'react-native-paper';

function AddNoteModal({isDialogVisible, hideDialog, noteType, saveNote}) {

  const [contentText, setContentText] = useState('');

  const onPressAddNoteButton = () => {
    hideDialog();
    const note = {
      type: 'note',
      content: contentText
    }
    saveNote(note);
    console.log('added note');
    setContentText('');
  }
  const onPressAddTaskButton = () => {
    hideDialog();
    const task = {
      type: 'task',
      content: contentText,
      complete: false
    }
    saveNote(task);
    console.log('added task');
    setContentText('');
  }


  if (noteType === 'note') {
    return (
      <Portal>
      <Dialog
         visible={isDialogVisible}
         onDismiss={hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This will be a note</Paragraph>
          <TextInput 
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
