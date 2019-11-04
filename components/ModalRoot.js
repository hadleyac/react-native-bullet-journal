import React from 'react';
import AddTaskModal from './AddTaskModal';
import AddNoteModal from './AddNoteModal';
import AddPageModal from './AddPageModal';
import EditPageModal from './EditPageModal';

function ModalRoot({ saveNote, savePage, deletePage }) {

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
      <EditPageModal
        savePage={savePage}
        deletePage={deletePage}
      />
    </>

  )
}

export default ModalRoot;

