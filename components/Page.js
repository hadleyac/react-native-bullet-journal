import React, { useState } from 'react'
import { ScrollView, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
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
          onLongPress={move}
          onPressOut={moveEnd}
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
          onLongPress={move}
          onPressOut={moveEnd}
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
    // return (
    //   <TouchableOpacity
    //     style={{ 
    //       // height: 100, 
    //       // backgroundColor: isActive ? 'blue' : item.backgroundColor,
    //       // alignItems: 'center', 
    //       // justifyContent: 'center' 
    //     }}
    //     onLongPress={move}
    //     onPressOut={moveEnd}
    //   >
    //     {/* <Text style={{ 
    //       fontWeight: 'bold', 
    //       color: 'white',
    //       fontSize: 32,
    //     }}>{item.label}</Text> */}
    //     <Text>{notes[noteID].content}</Text>
    //   </TouchableOpacity>
    // )
  }

  return (
    <>
    {/* <View> */}
      <DraggableFlatList
        data={page.notes}
        renderItem={this.renderItem}
        keyExtractor={(noteID) => `draggable-item+${noteID}`}
        scrollPercent={5}
        onMoveEnd={({ data }) => onMoveEnd(data)}
        extraData={notes}
        style={{minHeight: '100%'}}
        />

      
      {/* <FlatList
        data={page.notes}
        renderItem={({ item: noteID }) => {
          let note = notes[noteID]

          if (note.type === 'note') {
            return <Note
              note={note}
              noteID={noteID}
              deleteNote={deleteNote}
            />
          }

          else if (note.type === 'task') {
            return <Task
              note={note}
              onPressTaskRadioButton={onPressTaskRadioButton}
              noteID={noteID}
              deleteNote={deleteNote}
            />
          }

        }}
        keyExtractor={(noteID) => noteID.toString()}
        //I need to reference this data in order to trigger a rerender
        extraData={notes}
      /> */}

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
      {/* </View> */}
    </>


  )
}

export default Page

