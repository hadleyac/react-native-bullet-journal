import React from 'react'
import { Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Page from './Page';
import AddNoteFAB from './AddNoteFAB';
import ModalRoot from './ModalRoot';
import { connect } from 'react-redux';


function PagesTabView(props) {
  console.log(props.editPage);
  const { savePage, setEditPage, toggleAddPageModal, currentPage, pages, onIndexChange, notes, onPressTaskRadioButton, saveNote, deleteNote, onMoveEnd } = props;

  const navigationState = {
    index: currentPage,
    routes: pages
  }

  const renderTabBar = props => <TabBar {...props}
    scrollEnabled
    onTabLongPress={(target) => {
      setEditPage(target.route)
      toggleAddPageModal();
      // setEditPage({});
    }}
  />;

  return (
    <>
      <TabView
        navigationState={navigationState}
        renderScene={() => (
          <Page
            savePage={savePage}
            page={pages[currentPage]}
            notes={notes}
            onPressTaskRadioButton={onPressTaskRadioButton}
            saveNote={saveNote}
            deleteNote={deleteNote}
            onMoveEnd={onMoveEnd}
          />
        )}
        onIndexChange={onIndexChange}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
      <AddNoteFAB />
      <ModalRoot
        saveNote={saveNote}
        savePage={savePage}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    editPage: state.editPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEditPage: (targetPage) => dispatch({ type: 'SET_EDIT_PAGE', value: targetPage }),
    toggleAddPageModal: () => dispatch({ type: 'TOGGLE_ADD_PAGE_MODAL' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesTabView);
