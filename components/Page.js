import React, { useState } from 'react'
import { ScrollView, FlatList, Text } from 'react-native';
import { List } from 'react-native-paper';

import Note from './Note';
import Task from './Task';
import AddNoteFAB from './AddNoteFAB'
import AddNoteModal from './AddNoteModal';

const shortid = require('shortid')

function Page({ page, notes, onPressTaskRadioButton, saveNote, deleteNote }) {

  //controls for dialog box
  const [isDialogVisible, setDialog] = useState(false);
  const showDialog = () => setDialog(true);
  const hideDialog = () => setDialog(false);

  //sets type of dialog box to render, then opens it
  const [noteType, setNoteType] = useState('note');
  const addNote = () => { setNoteType('note'); showDialog() }
  const addTask = () => { setNoteType('task'); showDialog() }

  return (
    <>
      <FlatList
        data={page.notes}
        renderItem={({ item: noteID }) => {
          let note = notes[noteID]

          if (note.type === 'note') {
            return <Note
              note={note}
              key={shortid.generate()}
              noteID={noteID}
              deleteNote={deleteNote}
            />
          }

          else if (note.type === 'task') {
            return <Task
              note={note}
              onPressTaskRadioButton={onPressTaskRadioButton}
              noteID={noteID}
              key={shortid.generate()}
              deleteNote={deleteNote}
            />
          }

        }}
        keyExtractor={() => shortid.generate()}
      >

      </FlatList>
      <AddNoteFAB
        addNote={addNote}
        addTask={addTask}
      />
      <AddNoteModal
        isDialogVisible={isDialogVisible}
        hideDialog={hideDialog}
        noteType={noteType}
        saveNote={saveNote}
      />
    </>


  )
}

export default Page

