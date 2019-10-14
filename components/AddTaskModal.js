import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Portal, Switch, TextInput } from 'react-native-paper';
import { Platform, Text, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

function AddTaskModal({ isAddTaskModalOpen, toggleAddTaskModal, saveNote }) {
  let textInputRef = useRef(null)

  const [contentText, setContentText] = useState('');

  //Extra note signifiers
  const [important, setImportant] = useState(false);
  const [inspiration, setInspiration] = useState(false);
  const toggleImportant = () => { setImportant(!important) };
  const toggleInspiration = () => { setInspiration(!inspiration) };

  const onPressAddTaskButton = () => {
    textInputRef.current.blur();
    toggleAddTaskModal();
    InteractionManager.runAfterInteractions(() => {
      if (contentText) {
        const task = {
          type: 'task',
          content: contentText,
          complete: false,
          important: important,
          inspiration: inspiration
        }
        saveNote(task);
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
    if (isAddTaskModalOpen) {
      setTimeout(() => {
        textInputRef.current.focus()
      }, 50);
    }
  }, [isAddTaskModalOpen])

  return (
    <Portal>
      <Dialog
        visible={isAddTaskModalOpen}
        onDismiss={toggleAddTaskModal}
        style={{ top: Platform.OS === 'ios' ? -100 : 0 }}
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
            onPress={onPressAddTaskButton}
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
    isAddTaskModalOpen: state.isAddTaskModalOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddTaskModal: () => dispatch({ type: 'TOGGLE_ADD_TASK_MODAL' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal)
