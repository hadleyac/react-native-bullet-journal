import React from 'react';
import AddTaskModal from './AddTaskModal';
import AddNoteModal from './AddNoteModal';
import AddPageModal from './AddPageModal';

function ModalRoot({ saveNote, savePage }) {

  return (
    <>
      <AddTaskModal
        saveNote={saveNote}
      />
      <AddNoteModal
        saveNote={saveNote}
      />
      <AddPageModal
        savePage={savePage}
      />
    </>

  )
}

export default ModalRoot;

