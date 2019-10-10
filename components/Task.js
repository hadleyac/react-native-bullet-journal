import React, { PureComponent } from 'react'
import {
  List,
  IconButton
} from 'react-native-paper';
import {
  StyleSheet,
} from 'react-native';


class Task extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <List.Item
        title={this.props.content}
        titleStyle={this.props.complete ? styles.complete : styles.none}
        left={() => <IconButton size={12} icon="lens" disabled />}
        right={() => <IconButton size={16} icon="delete" onPress={() => { this.props.deleteNote(this.props.noteID) }} />}
      />
    )
  }

}
// function Task({ noteID, note, onPressTaskRadioButton, deleteNote }) {
//   const { complete, content, important, inspiration } = note;
//   return (
//     <List.Item
//       title={content}
//       titleStyle={complete ? styles.complete : styles.none}
//       left={() => <IconButton size={12} icon="lens" disabled />}
//       right={() => <IconButton size={16} icon="delete" onPress={() => { deleteNote(noteID) }} />}
//     />
//   )
// }

export default Task


const styles = StyleSheet.create({
  complete: {
    color: 'grey',
    textDecorationLine: 'line-through',
    // flexDirection: 'row'
  },
  none: {
    // flexDirection: 'row'
  }
})
