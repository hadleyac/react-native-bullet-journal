import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={{ backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ backgroundColor: '#673ab7' }} />
);

function PagesTabView({ navigationState, onIndexChange }) {
  console.log(JSON.stringify(onIndexChange))
  return (
    // <View>
    //   <Text>
    //     Hello
    //   </Text>
    // </View>
    <TabView
      navigationState={navigationState}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      })}
      onIndexChange={onIndexChange}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  )
}

export default PagesTabView
