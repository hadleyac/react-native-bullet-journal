import React, { PureComponent } from 'react'
import { List, IconButton } from 'react-native-paper';
import { Text } from 'react-native';


class Note extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <List.Item
        title={this.props.content}
        // description={this.props.bodyText}
        description={() => <Text style={{ color: 'rgba(0,0,0,.54)' }}>{this.props.bodyText}</Text>}
        titleStyle={{ flexWrap: 'wrap', flex: 1 }}
        left={() => <IconButton size={12} icon="remove" disabled />}
        right={() => <IconButton icon="delete" size={16} onPress={() => { this.props.deleteNote(this.props.noteID) }} />}
      />
    )
  }

}


export default Note
