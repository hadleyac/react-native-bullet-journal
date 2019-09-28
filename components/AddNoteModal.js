import React from 'react'
import { Button, List, Paragraph, Dialog, Portal} from 'react-native-paper';

function AddNoteModal({isDialogVisible, hideDialog, noteType}) {

  if (noteType === 'note') {
    return (
      <Portal>
      <Dialog
         visible={isDialogVisible}
         onDismiss={hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This will be a note</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
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
