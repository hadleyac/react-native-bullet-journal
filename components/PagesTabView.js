import React from 'react'
import { Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Page from './Page';
import AddNoteFAB from './AddNoteFAB';
import ModalRoot from './ModalRoot';
import { connect } from 'react-redux';
import { ThemeContext } from 'material-bread';


function PagesTabView(props) {
  const { savePage, deletePage, setEditPage, showEditPageModal, currentPage, pages, onIndexChange, notes, onPressTaskRadioButton, saveNote, deleteNote, onMoveEnd } = props;

  const navigationState = {
    index: currentPage,
    routes: pages
  }

  const renderTabBar = props =>
    <TabBar
      {...props}
      scrollEnabled
      style={{ backgroundColor: '#f50057' }}
      onTabLongPress={(target) => {
        setEditPage(target.route)
        showEditPageModal();
      }}
    />;

  return (
    <>
      <TabView
        navigationState={navigationState}
        renderScene={() => (
          <Page
            page={pages[currentPage]}
            notes={notes}
            onPressTaskRadioButton={onPressTaskRadioButton}
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
        deletePage={deletePage}
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
    showEditPageModal: () => dispatch({ type: 'SHOW_EDIT_PAGE_MODAL' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesTabView);
