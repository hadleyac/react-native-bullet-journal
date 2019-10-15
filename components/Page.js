import React from 'react'
import { TouchableOpacity, Vibration } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist'

import Note from './Note';
import Task from './Task';

function Page({ page, notes, onPressTaskRadioButton, deleteNote, onMoveEnd }) {

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
            content={note.content}
            bodyText={note.bodyText}
            important={note.important}
            inspiration={note.inspiration}
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
            onPressTaskRadioButton={onPressTaskRadioButton}
            complete={note.complete}
            content={note.content}
            // important={note.important}
            // inspiration={note.inspiration}
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
    </>
  )
}

export default Page
