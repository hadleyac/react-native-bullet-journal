import React from 'react'
import { Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Page from './Page'


function PagesTabView({ savePage, currentPage, pages, onIndexChange, notes, onPressTaskRadioButton, saveNote, deleteNote, onMoveEnd }) {

  const navigationState = {
    index: currentPage,
    routes: pages
  }

  const renderTabBar = props => <TabBar {...props}
    scrollEnabled
  />;

  return (
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
  )
}

export default PagesTabView
