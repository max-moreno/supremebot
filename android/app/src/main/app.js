import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCIyaog5kCCEc5b4sT9vBnf14ZvangWiL8",
      authDomain: "supremebot-b99da.firebaseapp.com",
      databaseURL: "https://supremebot-b99da.firebaseio.com",
      storageBucket: "supremebot-b99da.appspot.com",
      messagingSenderId: "1059501135496"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
     });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress = {() => firebase.auth().signOut()}>
            Log Out
          </Button>
          );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size = "large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText = 'Whats up?'/>
        { this.renderContent() }
      </View>
    );
  }
}
 export default App;
