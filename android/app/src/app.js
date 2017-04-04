import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection, Card } from './components/common';
import LoginForm from './components/LoginForm';
import OrderForm from './components/OrderForm';

class App extends Component {
  state = { loggedIn: null, home: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCIyaog5kCCEc5b4sT9vBnf14ZvangWiL8',
      authDomain: 'supremebot-b99da.firebaseapp.com',
      databaseURL: 'https://supremebot-b99da.firebaseio.com',
      storageBucket: 'supremebot-b99da.appspot.com',
      messagingSenderId: '1059501135496'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  onCreditPress(){
    return(
      <OrderForm />
    );
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress = { this.onCreditPress.bind(this) }>
                Credit Card Information
              </Button>
            </CardSection>
            <CardSection>
              <Button>
                Order Information
              </Button>
            </CardSection>
            <CardSection>
              <Button onPress={ () => firebase.auth().signOut() }>
              Log Out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Whats up?" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
