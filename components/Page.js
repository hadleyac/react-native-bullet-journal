import React from 'react'
import { 
  Text, 
  View,
  StyleSheet
} from 'react-native';

import { List} from 'react-native-paper';

import Note from './Note';
import Task from './Task';
import AddNote from './AddNote'

const shortid = require('shortid')

function Page({ page, notes, onPressTaskRadioButton}) {
  return (
    <>
      <List.Section>

        <List.Subheader>{page.title}</List.Subheader>
          {/* <List> */}
        {page.notes.map( (noteID, index) => {
          let note = notes[noteID]
          
          if (note.type === 'note') {
            return <Note 
              content={note.content}
              key={shortid.generate()}
              />
            } 
            
            else if (note.type === 'task') {
              return <Task 
                content={note.content}
                complete={note.complete}
                onPressTaskRadioButton={onPressTaskRadioButton}
                noteID={noteID}
                key={shortid.generate()}
                />
              }
              
            })}
            {/* </List> */}
      </List.Section>
      <AddNote />

    </>
      

  )
}

export default Page

