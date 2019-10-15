const initialState = {
  isAddPageModalOpen: false,
  isAddTaskModalOpen: false,
  isAddNoteModalOpen: false,
  important: false,
  inspiration: false,
  editPage: {}

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_PAGE_MODAL':
      return { ...state, isAddPageModalOpen: !state.isAddPageModalOpen };
    case 'CLOSE_ADD_PAGE_MODAL':
      return { ...state, isAddPageModalOpen: false };
    case 'TOGGLE_ADD_TASK_MODAL':
      return { ...state, isAddTaskModalOpen: !state.isAddTaskModalOpen };
    case 'CLOSE_ADD_TASK_MODAL':
      return { ...state, isAddTaskModalOpen: false };
    case 'TOGGLE_ADD_NOTE_MODAL':
      return { ...state, isAddNoteModalOpen: !state.isAddNoteModalOpen };
    case 'CLOSE_ADD_NOTE_MODAL':
      return { ...state, isAddNoteModalOpen: false };
    case 'SET_EDIT_PAGE':
      return { ...state, editPage: action.value }
  }
  return state
}

export default reducer