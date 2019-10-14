import React, { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';
import { connect } from 'react-redux';

function AddNoteFAB(props) {
  const [isOpen, toggleOpen] = useState(false)

  return (
    <Portal>
      <FAB.Group
        open={isOpen}
        icon={isOpen ? 'today' : 'add'}
        actions={[
          { icon: 'subject', label: 'Page', onPress: props.toggleAddPageModal },
          { icon: 'check-circle', label: 'Task', onPress: props.toggleAddTaskModal },
          { icon: 'subject', label: 'Note', onPress: props.toggleAddNoteModal },
        ]}
        onStateChange={({ open }) => toggleOpen(!isOpen)} //refactor?
        onPress={() => {
          if (isOpen) {
            console.log('the fab group is open')
          }
        }}
      />
    </Portal>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddPageModal: () => dispatch({ type: 'TOGGLE_ADD_PAGE_MODAL' }),
    toggleAddTaskModal: () => dispatch({ type: 'TOGGLE_ADD_TASK_MODAL' }),
    toggleAddNoteModal: () => dispatch({ type: 'TOGGLE_ADD_NOTE_MODAL' })
  }
}
export default connect(null, mapDispatchToProps)(AddNoteFAB)