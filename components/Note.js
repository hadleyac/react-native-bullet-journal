import React, { PureComponent } from 'react'
import { List, IconButton } from 'react-native-paper';


class Note extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <List.Item
        title={this.props.content}
        description="this is a description"
        // titleStyle={{ flexWrap: 'wrap', flex: 1 }}
        left={() => <IconButton size={12} icon="remove" disabled />}
        right={() => <IconButton icon="delete" size={16} onPress={() => { this.props.deleteNote(this.props.noteID) }} />}
      />
    )
  }

}
// function Note({ note, noteID, deleteNote }) {
//   const { content, important, inspiration } = note;
//   return (
//     <List.Item
//       title={content}
//       description="this is a description"
//       // titleStyle={{ flexWrap: 'wrap', flex: 1 }}
//       left={() => <IconButton size={12} icon="remove" disabled />}
//       right={() => <IconButton icon="delete" size={16} onPress={() => { deleteNote(noteID) }} />}
//     />


//   )
// }

export default Note
