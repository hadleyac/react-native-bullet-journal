import React, { useState } from 'react'
import { Text, TouchableOpacity, Vibration } from 'react-native';
// import {} from 'react-native-paper';
import DraggableFlatList from 'react-native-draggable-flatlist'

import Note from './Note';
import Task from './Task';
import AddNoteFAB from './AddNoteFAB'
import AddNoteModal from './AddNoteModal';

function Page({ page, notes, onPressTaskRadioButton, saveNote, deleteNote, onMoveEnd }) {

  //controls for dialog box
  const [isDialogVisible, setDialog] = useState(false);
  const showDialog = () => setDialog(true);
  const hideDialog = () => setDialog(false);

  //sets type of dialog box to render, then opens it
  const [noteType, setNoteType] = useState('note');
  const addNote = () => { setNoteType('note'); showDialog() }
  const addTask = () => { setNoteType('task'); showDialog() }

  renderItem = ({ item: noteID, index, move, moveEnd, isActive }) => {

    let note = notes[noteID]

    if (note.type === 'note') {
      return (
        <TouchableOpacity
          onLongPress={() => { Vibration.vibrate(20); move() }}
          onPressOut={moveEnd}
          style={{ backgroundColor: isActive ? '#fce4ec' : noteID.backgroundColor, }}
        >
          <Note
            note={note}
            noteID={noteID}
            deleteNote={deleteNote}
          />
        </TouchableOpacity>
      )
    }

    else if (note.type === 'task') {
      return (
        <TouchableOpacity
          onLongPress={() => { Vibration.vibrate(20); move() }}
          onPressOut={moveEnd}
          onPress={() => { onPressTaskRadioButton(noteID) }}
          style={{ backgroundColor: isActive ? '#fce4ec' : noteID.backgroundColor, }}
        >
          <Task
            note={note}
            onPressTaskRadioButton={onPressTaskRadioButton}
            noteID={noteID}
            deleteNote={deleteNote}
          />
        </TouchableOpacity>
      )
    }
  }

  return (
    <>
      <DraggableFlatList
        data={page.notes}
        renderItem={this.renderItem}
        keyExtractor={(noteID) => `draggable-item+${noteID}`}
        scrollPercent={5}
        onMoveEnd={({ data }) => onMoveEnd(data)}
        extraData={notes}
        style={{ minHeight: '100%' }}
      />
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
