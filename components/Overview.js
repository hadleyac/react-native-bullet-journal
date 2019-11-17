import React from 'react'
import { Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Overview() {
  return (
    <View style={{ width: 100, height: 100 }}>
      <LinearGradient
        colors={['#448AFF', '#9E9E9E', '#FFEB3B', '#FF5722']}
        style={{ position: 'absolute' }}
      >
        <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>

        </View>

      </LinearGradient>
    </ View>
  )
}

export default Overview
