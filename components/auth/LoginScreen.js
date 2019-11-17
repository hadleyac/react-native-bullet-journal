import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import { DefaultTheme, Text, TextInput, Button } from 'react-native-paper';
import * as firebase from 'firebase'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log(this.state.email)
        console.log(this.state.password)
        console.log('success')

      }, (error) => {
        console.log(this.state.email)
        console.log(this.state.password)
        console.log('fail')
        Alert.alert(error.message)
      })
  }
  render() {
    return (
      <>
        <SafeAreaView style={styles.statusBar} />
        <SafeAreaView style={styles.container} >
          {/* <KeyboardAvoidingView > */}
          <Text>
            Let's Get Going!
          </Text>
          <TextInput
            style={styles.input}
            label='email'
            value={this.state.username}
            onChangeText={email => this.setState({ email })}
            theme={loginTheme}
            mode='outlined'
            dense='true'
          />
          <TextInput
            style={styles.input}
            label='password'
            value={this.state.username}
            onChangeText={password => this.setState({ password })}
            theme={loginTheme}
            mode='outlined'
            dense='true'
            underlineColor='white'
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
            value={this.state.username}
            onChangeText={email => this.setState({ email })}
            theme={loginTheme}
            mode='outlined'
            dense='true'
          />
          <TextInput
            style={styles.input}
            label='password'
            value={this.state.username}
            onChangeText={password => this.setState({ password })}
            theme={loginTheme}
            mode='outlined'
            dense='true'
            underlineColor='white'
          />
          <Button
            style={styles.input}
            theme={loginTheme}
            color='rgba(255,64,129 ,1)'
            mode='contained'
            onPress={this.onLoginPress}
          >
            Login
            </Button>
          {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
      </>

    )
  }
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
    width: '80%'
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