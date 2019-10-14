import React from 'react';
import AddTaskModal from './AddTaskModal'
import AddNoteModal from './AddNoteModal';

function ModalRoot({ saveNote }) {

  return (
    <>
      <AddTaskModal
        saveNote={saveNote}
      />
      <AddNoteModal
        saveNote={saveNote}
      />
    </>

  )
}

export default ModalRoot

