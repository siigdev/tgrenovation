import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import firebase from 'firebase';

export default class AuthenticationRouter extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    this.props.navigation.navigate(firebase.auth().currentUser ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}