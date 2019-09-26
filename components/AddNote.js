import React, { useState } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import { 
  StyleSheet
} from 'react-native';

function AddNote() {
  const [isOpen, toggleOpen] = useState(false)

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={isOpen}
          icon={isOpen ? 'today' : 'add'}
          actions={[
            { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
            { icon: 'note-add', label: 'Reminder', onPress: () => console.log('Pressed notifications') },
          ]}
          onStateChange={({ open }) => toggleOpen(!isOpen)}
          onPress={() => {
            if (isOpen) {
              console.log('the fab group is open')
            }
          }}
        />

      </Portal>
     </Provider>
  //   <FAB
  //   style={styles.fab}
  //   icon="add"
  //   onPress={() => console.log('Pressed')}
  // />
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
