import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import Page from './Page'

const FirstRoute = () => (
  <View style={{ backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ backgroundColor: '#673ab7' }} />
);

const ThirdRoute = () => (
  <View style={{ backgroundColor: '#673ab7' }} />
);

const FourthRoute = () => (
  <View style={{ backgroundColor: '#673ab7' }} />
);

const FifthRoute = () => (
  <View style={{ backgroundColor: '#673ab7' }} />
);

const SixthRoute = () => (
  <View style={{ backgroundColor: '#673ab7' }} />
);

function PagesTabView({ currentPage, pages, onIndexChange }) {
  console.log(pages)

  const navigationState = {
    index: currentPage,
    routes: pages
  }


  console.log(navigationState)

  const renderTabBar = props => <TabBar {...props}
    scrollEnabled
  />;

  return (
    // <View>
    //   <Text>
    //     Hello
    //   </Text>
    // </View>
    <TabView
      navigationState={navigationState}
      // renderScene={SceneMap({
      //   first: FirstRoute,
      //   second: SecondRoute,
      //   third: ThirdRoute,
      //   fourth: FourthRoute,
      //   // fifth: FifthRoute,
      //   // sixth: SixthRoute

      // })}
      renderScene={() => <Text>Hello World</Text>}
      onIndexChange={onIndexChange}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={renderTabBar}
    // renderTabBar={() => {

    //   <TabBar
    //     {...props}
    //     scrollEnabled

    //   />
    // }}
    />
  )
}

export default PagesTabView
