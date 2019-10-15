import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Portal, Switch, TextInput } from 'react-native-paper';
import { Platform, Text, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

function AddNoteModal({ isAddNoteModalOpen, closeAddNoteModal, saveNote }) {
  let textInputRef = useRef(null)

  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('')


  //Extra note signifiers
  const [important, setImportant] = useState(false);
  const [inspiration, setInspiration] = useState(false);
  const toggleImportant = () => { setImportant(!important) };
  const toggleInspiration = () => { setInspiration(!inspiration) };

  const onPressAddNoteButton = () => {
    //hide keyboard
    textInputRef.current.blur();
    //hide dialog
    closeAddNoteModal();
    //run animations first, then logic
    InteractionManager.runAfterInteractions(() => {
      if (title) {
        const note = {
          type: 'note',
          content: title,
          important: important,
          inspiration: inspiration,
          bodyText: bodyText,
        }
        saveNote(note);
        resetInput();
      }
    })
  }

  //reset everything after adding a note
  const resetInput = () => {
    setTitle('');
    setBodyText('');
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
        onDismiss={closeAddNoteModal}
        style={{ top: Platform.OS === 'ios' ? -100 : 0 }}

      >
        <Dialog.Title>New Note</Dialog.Title>
        <Dialog.Content avoidKeyboard>
          <TextInput
            ref={textInputRef}
            label='type your note'
            mode='outlined'
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            label='optional body text'
            mode='outlined'
            value={bodyText}
            onChangeText={text => setBodyText(text)}
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
            disabled={!isAddNoteModalOpen}
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
    closeAddNoteModal: () => dispatch({ type: 'CLOSE_ADD_NOTE_MODAL' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteModal);
