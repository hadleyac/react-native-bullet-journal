import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { Platform, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

function EditPageModal({ setEditPage, isEditPageModalOpen, closeEditPageModal, savePage, editPage, deletePage }) {
  let textInputRef = useRef(null)

  //initialize a page title that defaults to the stringified, formatted, timestamp. 
  const [title, setTitle] = useState(null);

  const onPressAddPageButton = () => {
    //hide keyboard
    textInputRef.current.blur();
    //hide dialog
    closeEditPageModal();
    InteractionManager.runAfterInteractions(() => {
      if (title) {
        const timeStamp = moment(editPage.date);
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

  onPressDeletePageButton = () => {
    InteractionManager.runAfterInteractions(() => {
      closeEditPageModal();
      deletePage(editPage.key)
      setEditPage({})
    })

  }
  useEffect(() => {
    //Will focus the textInput box if the modal is visible
    if (isEditPageModalOpen) {
      setTitle(editPage.title);
      setTimeout(() => {
        textInputRef.current.focus()
      }, 50);
    }
  }, [isEditPageModalOpen])

  return (
    <Portal>
      <Dialog
        visible={isEditPageModalOpen}
        onDismiss={closeEditPageModal}
        style={{ top: Platform.OS === 'ios' ? -100 : 0 }}

      >
        <Dialog.Title>Edit Page</Dialog.Title>
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
            onPress={onPressDeletePageButton}
            disabled={!isEditPageModalOpen}
            icon='delete'
          >
            Delete
          </Button>
          <Button
            onPress={onPressAddPageButton}
            disabled={!isEditPageModalOpen}
          >
            Update
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

const mapStateToProps = (state) => {
  return {
    isEditPageModalOpen: state.isEditPageModalOpen,
    editPage: state.editPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEditPage: (targetPage) => dispatch({ type: 'SET_EDIT_PAGE', value: targetPage }),
    closeEditPageModal: () => dispatch({ type: 'CLOSE_EDIT_PAGE_MODAL' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPageModal);
