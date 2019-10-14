const initialState = {
  isAddPageModalOpen: false,
  isAddTaskModalOpen: false,
  isAddNoteModalOpen: false,
  important: false,
  inspiration: false,


}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_PAGE_MODAL':
      return { ...state, isAddPageModalOpen: !state.isAddPageModalOpen };
    case 'TOGGLE_ADD_TASK_MODAL':
      console.log('adding task from redux')
      return { ...state, isAddTaskModalOpen: !state.isAddTaskModalOpen };
    case 'TOGGLE_ADD_NOTE_MODAL':
      console.log('adding note from redux')
      return { ...state, isAddNoteModalOpen: !state.isAddNoteModalOpen };
  }
  return state
}

export default reducer