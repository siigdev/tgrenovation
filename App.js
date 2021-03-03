import React from 'react';
import { Block } from './src/components';
import Navigation from './src/navigation';
import ApiKeys from './src/constants/ApiKeys';
import firebase from 'firebase';

export default function App() {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
  return (
    <Block>
      <Navigation />
    </Block>
  );
}
