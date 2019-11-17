import React, { Component, useState } from 'react'
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Alert, TextInputMa } from 'react-native'
import { DefaultTheme, Text, TextInput, Button } from 'react-native-paper';
import * as firebase from 'firebase'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('success')

      }, (error) => {
        console.log('fail')
        Alert.alert(error.message)
      })
  }
  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.container} >
        <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>
          Let's Get Going!
      </Text>
        <TextInput
          style={styles.input}
          label='email'
          onChangeText={text => setEmail(text)}
          theme={loginTheme}
          mode='outlined'
          dense={true}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          label='password'
          onChangeText={text => setPassword(text)}
          theme={loginTheme}
          mode='outlined'
          dense='true'
          underlineColor='white'
          secureTextEntry={true}
        />
        <Button
          style={styles.input}
          theme={loginTheme}
          color='rgba(255,64,129 ,1)'
          mode='contained'
        >
          signup
        </Button>
        <TextInput
          style={styles.input}
          label='email'
          onChangeText={text => setEmail(text)}
          theme={loginTheme}
          mode='outlined'
          dense='true'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          label='password'
          onChangeText={text => setPassword(text)}
          theme={loginTheme}
          mode='outlined'
          dense='true'
          underlineColor='white'
          secureTextEntry={true}
        />
        <Button
          style={styles.input}
          theme={loginTheme}
          color='rgba(255,64,129 ,1)'
          textColor='white'
          mode='contained'
          onPress={onLoginPress}
        >
          Login
      </Button>
        <Text style={{ marginTop: 20, color: 'white', fontSize: 16 }}>
          Create an account
      </Text>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f50057',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusBar: {
    flex: 0,
    backgroundColor: '#f50057'
  },
  input: {
    width: '80%',
    color: 'white'
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

export default LoginScreen
