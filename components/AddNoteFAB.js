import React, { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';
import { connect } from 'react-redux';

function AddNoteFAB(props) {
  const [isOpen, toggleOpen] = useState(false)

  return (
    <Portal>
      <FAB.Group
        open={isOpen}
        icon={isOpen ? 'playlist-plus' : 'plus'}
        // icon='plus'
        actions={[
          { icon: 'file-document-outline', label: 'Page', onPress: props.showAddPageModal },
          { icon: 'check-circle', label: 'Task', onPress: props.showAddTaskModal },
          { icon: 'text', label: 'Note', onPress: props.showAddNoteModal },
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
    showAddPageModal: () => dispatch({ type: 'SHOW_ADD_PAGE_MODAL' }),
    showAddTaskModal: () => dispatch({ type: 'SHOW_ADD_TASK_MODAL' }),
    showAddNoteModal: () => dispatch({ type: 'SHOW_ADD_NOTE_MODAL' })
  }
}
export default connect(null, mapDispatchToProps)(AddNoteFAB)