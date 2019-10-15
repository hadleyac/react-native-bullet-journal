import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { Platform, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

function AddPageModal({ isAddPageModalOpen, closeAddPageModal, savePage, editPage }) {
  let textInputRef = useRef(null)
  const editMode = Object.keys(editPage).length !== 0;

  //initialize a page title that defaults to the stringified, formatted, timestamp. 
  const [title, setTitle] = useState(null);

  const onPressAddPageButton = () => {
    //hide keyboard
    textInputRef.current.blur();
    //hide dialog
    closeAddPageModal();
    InteractionManager.runAfterInteractions(() => {
      if (title) {
        const timeStamp = moment(editPage.date) || new moment();
        const page = {
          date: timeStamp,
          title: title,
          key: timeStamp.format('dhms'),
          notes: [],
        }
        savePage(page);
      }
    });
  }
  useEffect(() => {
    setTitle(editPage.title || new moment().format('ddd d/M/YY'));
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
        onDismiss={closeAddPageModal}
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
            disabled={!isAddPageModalOpen}
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
    isAddPageModalOpen: state.isAddPageModalOpen,
    editPage: state.editPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeAddPageModal: () => dispatch({ type: 'TOGGLE_ADD_PAGE_MODAL' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPageModal);
