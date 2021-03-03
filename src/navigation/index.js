import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthenticationRouter from '../screens/AuthenticationRouter';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import SignUp from '../screens/SignUp';
import Order from '../screens/Order';
import Confirmation from '../screens/Confirmation';
import { Text } from '../components';

const authLoadingScreen = createStackNavigator({
    AuthenticationRouter: {
        screen: AuthenticationRouter
    }
});
const authScreens = createStackNavigator({
    Welcome: {
        screen: Welcome, 
        navigationOptions: {
            title: '',
            headerTransparent: true, 
          }
    },
    Login: {
        screen: Login, 
        navigationOptions: {
            title: '',
            headerTransparent: true, 
          }
    },
    SignUp: {
        screen: SignUp, 
        navigationOptions: {
            title: '',
            headerTransparent: true, 
          }
    }
})
const screens = createStackNavigator({
    Order: {
        screen: Order, 
        navigationOptions: {
            title: '',
            headerTransparent: true, 
          }
    },
    Confirmation: {
        screen: Confirmation, 
        navigationOptions: {
            title: '',
            headerTransparent: true, 
          }
    },
},
    {
        initialRouteName: 'Order'
    })

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: authLoadingScreen,
        App: screens,
        Auth: authScreens,
    },
    {
        initialRouteName: 'AuthLoading',
    })
);