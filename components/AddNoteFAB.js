import React, { useState } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import {
  StyleSheet
} from 'react-native';

function AddNote({ addNote, addTask, addPage }) {
  const [isOpen, toggleOpen] = useState(false)

  return (
    <Portal>
      <FAB.Group
        open={isOpen}
        icon={isOpen ? 'today' : 'add'}
        actions={[
          { icon: 'subject', label: 'Page', onPress: addPage },
          { icon: 'check-circle', label: 'Task', onPress: addTask },
          { icon: 'subject', label: 'Note', onPress: addNote },
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

export default AddNote

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 0,
  },
})
