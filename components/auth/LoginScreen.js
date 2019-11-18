import React, { Component, useState } from 'react'
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Alert, TextInputMa } from 'react-native'
import { DefaultTheme, Text, TextInput, Button } from 'react-native-paper';
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

function LoginScreen(props) {
  const { navigate } = props.navigation;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('success')

      }, (error) => {
        console.log('fail')
        console.log(email, password)
        Alert.alert(error.message)
      })
  }
  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.container} >
        <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>
          Welcome Back :)
      </Text>
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
          <Text style={{ color: "white" }}>
            Login
          </Text>
        </Button>
        <TouchableOpacity
          onPress={() => navigate('ForgotPassword')}
        >
          <Text style={{ marginTop: 30, color: 'white', fontSize: 16 }}>
            Forgot Password
      </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate('Signup')}
        >
          <Text
            style={{ marginTop: 30, color: 'white', fontSize: 16 }}
            onPress={() => navigate('Signup')}
          >
            Create an account
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

export default LoginScreen
