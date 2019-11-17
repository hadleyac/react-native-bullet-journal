import React, { Component, useState } from 'react'
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native'
import { DefaultTheme, Text, TextInput, Button } from 'react-native-paper';
import * as firebase from 'firebase'

function ForgotPasswordScreen(props) {
  const { navigate } = props.navigation;
  const [email, setEmail] = useState('')

  const onResetButtonPress = () => {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      Alert.alert('Link sent!')
      navigate('Login')
      console.log('email sent')
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert(errorMessage);
    });
  }


  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.container} >
        <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>
          Forgot your password?
      </Text>
        <Text style={{ color: 'white', fontSize: 16, marginBottom: 20, maxWidth: '80%' }}>
          No problem! Enter your email below and we'll send you a link to create a new one.
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
        <Button
          style={styles.input}
          theme={loginTheme}
          color='rgba(255,64,129 ,1)'
          mode='contained'
          onPress={onResetButtonPress}
        >
          <Text style={{ color: "white" }}>
            Send
          </Text>
        </Button>
        <TouchableOpacity
          onPress={() => navigate('Login')}
        >
          <Text style={{ marginTop: 30, color: 'white', fontSize: 16 }}>
            Back to Login
        </Text>
        </TouchableOpacity>
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
    marginTop: 10
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

export default ForgotPasswordScreen
