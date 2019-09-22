import React, { useState } from 'react';
import { 
  StyleSheet,
  SafeAreaView, 
  Text, 
  // TextInput, 
  View, 
  // Button 
} from 'react-native';
import Constants from 'expo-constants';
import { Button, TextInput, List } from 'react-native-paper';


export default function App() {

  const [tasks, setTasks] = useState(['first task'])
  const [inputText, setInputText] = useState('')

  const onAddButtonPress = () => {
    if (inputText !== '') {
      setTasks([...tasks, inputText]);
      setInputText('');
    }
  }
  return (
    // <SafeAreaView>
    <View style={styles.container}> 
      <Text>This is my fantastic app</Text>
      <TextInput 
        label='type a task'
        onChangeText={text => setInputText(text)}
        value={inputText}
      />
      <Button icon="send" mode="contained" onPress={onAddButtonPress}>
        Press me
      </Button>
      {tasks.map( (task, index) => <Text key={index}>{task}</Text>)}
    </View>
    // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
    flex: 1, 
    // alignItems: 'center', 
    // justifyContent: 'center',
  },
  inputStyle: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1
  }

})
