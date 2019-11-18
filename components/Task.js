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
        left={() => <IconButton size={12} icon="checkbox-blank-circle" style={styles.icon} disabled />}
        right={() => <IconButton size={16} icon="delete" onPress={() => { this.props.deleteNote(this.props.noteID) }} />}
      />
    )
  }

}
export default Task

const styles = StyleSheet.create({
  complete: {
    color: 'grey',
    textDecorationLine: 'line-through',
    // flexDirection: 'row'
  },
  icon: {
    // flex: 1,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 5
  }
})
