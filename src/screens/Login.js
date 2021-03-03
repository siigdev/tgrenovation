import React, { Component } from 'react'
import { ImageBackground, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { Block, Text, Input, Button, Loading } from '../components'
import { theme } from '../constants';
import firebase from 'firebase';

export default class Login extends Component {
    state = {
        isLoading: false,
        email: '',
        kodeord: ''
    }
    _signInAsync = async () => {
        const { navigation } = this.props;
        navigation.navigate("App");
    };

    loginHandler() {
        const { email, kodeord } = this.state;
        Keyboard.dismiss();
        this.setState({ isLoading: true });
        try {
            firebase.auth().signInWithEmailAndPassword(email.replace(/\s/g, ''), kodeord).then(() => {
                this._signInAsync();
            })
                .catch(error => {
                    this.setState({ isLoading: false });
                    console.warn(error)
                });
        } catch (error) {
            this.setState({ isLoading: false });
            console.warn(error)
        }
    }
    render() {
        const { isLoading } = this.state;
        return (
            <ImageBackground source={require('../assets/images/LeavesBackground.jpg')} style={{ width: '100%', height: '100%' }} imageStyle={{opacity: 0.3}}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <Block row center>
                        {isLoading ? <Loading/> : 
                        <Block middle padding={[0, theme.sizes.base]}>
                            <Input
                                label={"E-mail"}
                                defaultValue={this.state.email}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                            <Input
                                label={"Kodeord"}
                                secureTextEntry={true} 
                                defaultValue={this.state.kodeord}
                                onChangeText={(text) => this.setState({ kodeord: text })}
                            />

                            <Button gradient onPress={() => this.loginHandler()}>
                                <Text bold center>Log ind</Text>
                            </Button>
                        </Block>
                        }
                    </Block>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}