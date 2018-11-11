import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyB_eUcx4AaMQ_Yfmkpl5ovEtB2SfByIFKk",
      authDomain: "onetime-password-f5865.firebaseapp.com",
      databaseURL: "https://onetime-password-f5865.firebaseio.com",
      projectId: "onetime-password-f5865",
      storageBucket: "onetime-password-f5865.appspot.com",
      messagingSenderId: "88632114427"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
