import React, { useState, useEffect, useRef } from 'react'
import { Button, Dialog, Portal, Switch, TextInput } from 'react-native-paper';
import { Platform, Text, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

function AddPageModal({ isAddPageModalOpen, toggleAddPageModal, savePage }) {
  //initalize a timestamp on render
  const [timeStamp, setTimeStamp] = useState(new moment());
  //initialize a page title that defaults to the stringified, formatted, timestamp. 
  const [title, setTitle] = useState(timeStamp.format('ddd d/M/YY'));

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
            // ref={textInputRef}
            label='Title'
            mode='outlined'
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => console.log('need save page function')}
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
