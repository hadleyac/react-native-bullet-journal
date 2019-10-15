const initialState = {
  isEditPageModalOpen: false,
  isAddPageModalOpen: false,
  isAddTaskModalOpen: false,
  isAddNoteModalOpen: false,
  important: false,
  inspiration: false,
  editPage: {}

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ADD_PAGE_MODAL':
      return { ...state, isAddPageModalOpen: true };
    case 'CLOSE_ADD_PAGE_MODAL':
      return { ...state, isAddPageModalOpen: false };

    case 'CLOSE_EDIT_PAGE_MODAL':
      return { ...state, isEditPageModalOpen: false };
    case 'SHOW_EDIT_PAGE_MODAL':
      return { ...state, isEditPageModalOpen: true };

    case 'SHOW_ADD_TASK_MODAL':
      return { ...state, isAddTaskModalOpen: true };
    case 'CLOSE_ADD_TASK_MODAL':
      return { ...state, isAddTaskModalOpen: false };

    case 'SHOW_ADD_NOTE_MODAL':
      return { ...state, isAddNoteModalOpen: true };
    case 'CLOSE_ADD_NOTE_MODAL':
      return { ...state, isAddNoteModalOpen: false };

    case 'SET_EDIT_PAGE':
      return { ...state, editPage: action.value }
  }
  return state
}

export default reducer