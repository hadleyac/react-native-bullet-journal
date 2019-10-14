import React, { useState } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import {
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

function AddNoteFAB(props) {
  const { addNote, addTask, addPage } = props;
  const [isOpen, toggleOpen] = useState(false)

  return (
    <Portal>
      <FAB.Group
        open={isOpen}
        icon={isOpen ? 'today' : 'add'}
        actions={[
          { icon: 'subject', label: 'Page', onPress: addPage },
          { icon: 'check-circle', label: 'Task', onPress: props.toggleAddTaskModal },
          { icon: 'subject', label: 'Note', onPress: props.toggleAddNoteModal },
        ]}
        onStateChange={({ open }) => toggleOpen(!isOpen)}
        onPress={() => {
          if (isOpen) {
            console.log('the fab group is open')
          }
        }}
      />
    </Portal>
  )
}


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 0,
  },
})


const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddPageModal: () => dispatch({ type: 'TOGGLE_ADD_PAGE_MODAL' }),
    toggleAddTaskModal: () => dispatch({ type: 'TOGGLE_ADD_TASK_MODAL' }),
    toggleAddNoteModal: () => dispatch({ type: 'TOGGLE_ADD_NOTE_MODAL' })
  }
}
export default connect(null, mapDispatchToProps)(AddNoteFAB)