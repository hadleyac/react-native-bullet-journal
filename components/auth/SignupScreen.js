import React, { Component, useState } from 'react'
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import { DefaultTheme, Text, Button, TextInput } from 'react-native-paper';
import * as firebase from 'firebase'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

function SignupScreen(props) {
  const { navigate } = props.navigation;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSignupButtonPress = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email, password)
      //It might not be wise to give the user access to all the error messages, but I'm leaving it for now since I'm testing
      Alert.alert(errorMessage);
    });

  }
  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.container} >
        {/* <KeyboardAvoidingView style={styles.container}> */}
        {/* <ScrollView> */}

        <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>
          Let's Get Going!
      </Text>
        <TextInput
          style={styles.input}
          label='email'
          onChangeText={text => setEmail(text)}
          theme={loginTheme}
          mode='outlined'
          // fontSize={6}
          // dense={true}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          label='password'
          onChangeText={text => setPassword(text)}
          theme={loginTheme}
          mode='outlined'
          // dense='true'
          underlineColor='white'
          secureTextEntry={true}
        />
        <Button
          style={styles.input}
          theme={loginTheme}
          color='rgba(255,64,129 ,1)'
          mode='contained'
          onPress={onSignupButtonPress}
        >
          <Text style={{ color: "white" }}>
            Sign Up
          </Text>
        </Button>
        <TouchableOpacity
          onPress={() => navigate('Login')}
        >
          <Text style={{ marginTop: 30, color: 'white', fontSize: 16 }}>
            Already have an account? Sign in here
        </Text>
        </TouchableOpacity>
        {/* </KeyboardAvoidingView> */}
        {/* </ScrollView> */}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f50057',
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: -200
  },
  statusBar: {
    flex: 0,
    backgroundColor: '#f50057'
  },
  input: {
    width: '80%',
    color: 'white',
    marginTop: 10,
  },
  button: {

  }

});

const loginTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f50057',
    primary: 'white',
    secondary: 'rgba(236,64,122 ,1)',
    text: 'white',
    surface: 'white',
    // placeholder: 'rgba(224,224,224 ,1)'
    placeholder: 'white'
    // accent: '#f50057',
  }
};

export default SignupScreen
