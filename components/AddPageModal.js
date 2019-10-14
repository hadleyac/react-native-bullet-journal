import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Portal, Switch, TextInput } from 'react-native-paper';
import { Platform, Text, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

function AddPageModal({ isAddPageModalOpen, toggleAddPageModal, savePage }) {
  let textInputRef = useRef(null)
  //initalize a timestamp on render
  const [timeStamp, setTimeStamp] = useState(new moment());
  //initialize a page title that defaults to the stringified, formatted, timestamp. 
  const [title, setTitle] = useState(timeStamp.format('ddd d/M/YY'));

  const onPressAddPageButton = () => {

    //hide keyboard
    textInputRef.current.blur();
    //hide dialog
    toggleAddPageModal();

    InteractionManager.runAfterInteractions(() => {
      if (title) {
        const page = {
          date: timeStamp,
          title: title,
          key: timeStamp.format('dhms'),
          notes: [],
        }
        savePage(page);
      }

    });
    console.log('trying to add a page');

  }

  useEffect(() => {
    //Will focus the textInput box if the modal is visible
    if (isAddPageModalOpen) {
      setTimeout(() => {
        textInputRef.current.focus()
      }, 50);
    }
  }, [isAddPageModalOpen])

  return (
    <Portal>
      <Dialog
        visible={isAddPageModalOpen}
        onDismiss={toggleAddPageModal}
        style={{ top: Platform.OS === 'ios' ? -100 : 0 }}

      >
        <Dialog.Title>Add Page</Dialog.Title>
        <Dialog.Content avoidKeyboard>
          <TextInput
            ref={textInputRef}
            label='Title'
            mode='outlined'
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={onPressAddPageButton}
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
    isAddPageModalOpen: state.isAddPageModalOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddPageModal: () => dispatch({ type: 'TOGGLE_ADD_PAGE_MODAL' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPageModal);
