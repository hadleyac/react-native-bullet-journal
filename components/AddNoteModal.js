import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Portal, Switch, TextInput } from 'react-native-paper';
import { Platform, Text, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

function AddNoteModal({ isAddNoteModalOpen, toggleAddNoteModal, saveNote }) {
  let textInputRef = useRef(null)

  const [contentText, setContentText] = useState('');

  //Extra note signifiers
  const [important, setImportant] = useState(false);
  const [inspiration, setInspiration] = useState(false);
  const toggleImportant = () => { setImportant(!important) };
  const toggleInspiration = () => { setInspiration(!inspiration) };

  const onPressAddNoteButton = () => {
    //hide keyboard
    textInputRef.current.blur();
    //hide dialog
    toggleAddNoteModal();
    //run animations first, then logic
    InteractionManager.runAfterInteractions(() => {
      if (contentText) {
        const note = {
          type: 'note',
          content: contentText,
          important: important,
          inspiration: inspiration
        }
        saveNote(note);
        resetInput();
      }
    })
  }

  //reset everything after adding a note
  const resetInput = () => {
    setContentText('');
    setImportant(false);
    setInspiration(false);
  }

  useEffect(() => {
    //Will focus the textInput box if the modal is visible
    if (isAddNoteModalOpen) {
      setTimeout(() => {
        textInputRef.current.focus()
      }, 50);
    }
  }, [isAddNoteModalOpen])

  return (
    <Portal>
      <Dialog
        visible={isAddNoteModalOpen}
        onDismiss={toggleAddNoteModal}
        style={{ top: Platform.OS === 'ios' ? -100 : 0 }}

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

const mapStateToProps = (state) => {
  return {
    isAddNoteModalOpen: state.isAddNoteModalOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddNoteModal: () => dispatch({ type: 'TOGGLE_ADD_NOTE_MODAL' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteModal);
