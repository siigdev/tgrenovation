import React, { Component } from 'react'
import { ImageBackground, Keyboard } from 'react-native'
import { Block, Text, Input, Button, Loading } from '../components'
import { theme } from '../constants';
import firebase from 'firebase';
import ValidationComponent from 'react-native-form-validator';

export default class SignUp extends ValidationComponent  {
    state = {
        isLoading: false,
        butikNavn: '',
        adresse: '',
        postnummer: '',
        cvr: '',
        email: '',
        forretningTlf: '',
        privatTlf: '',
        kodeord: '',
        gentagKodeord: ''
    }
    
    _signInAsync = async () => {
        const { navigation } = this.props;
        navigation.navigate("App");
    };

    validateFields() {
        this.validate({
            butikNavn: {minlength:1 , required: true},
            adresse: {minlength:2, required: true},
            email: {email: true, required: true},
            forretningTlf: { minlength:8, maxlength:8, numbers: true, required: true},
            privatTlf: { minlength:8, maxlength:8, numbers: true, required: true},
            cvr: { minlength:8, maxlength:8, numbers: true, required: true},
            postnummer: { minlength:4, maxlength:4, numbers: true, required: true},
            kodeord: { minlength:6, maxlength:50, required: true},
            gentagKodeord: {equalPassword: this.state.kodeord, required: true}
          });
    }
    signUpHandler() {
        const { email, kodeord } = this.state;
        Keyboard.dismiss();
        this.validateFields();

        if(this.isFormValid()) {
            this.setState({ isLoading: true });
            try {
                firebase.auth().createUserWithEmailAndPassword(email.replace(/\s/g, ''), kodeord).then((u) => {
                    this.createUserData(u.user.uid)
                    this._signInAsync()
                }).catch(error => {
                    console.log(error)
                    this.setState({ isLoading: false });
                    switch (error.code) {
                        case 'auth/invalid-email':
                            console.warn('Invalid mail')
                            break;
                    }
                });
            } catch (error) {
                this.setState({ isLoading: false });
            }
        }
    }
    createUserData(userId){
        firebase.database().ref('users/' + userId).set({
            adresse: this.state.adresse,
            butikNavn: this.state.butikNavn,
            cvr: this.state.cvr,
            forretningTlf : this.state.forretningTlf,
            privatTlf: this.state.privatTlf,
            postnummer: this.state.postnummer
        });
    }
    render() {
        const { isLoading } = this.state;
        return (
            <ImageBackground source={require('../assets/images/LeavesBackground.jpg')} style={{ width: '100%', height: '100%'}} imageStyle={{opacity: 0.3}}>
                <Block row center>
                    {isLoading ? <Loading/> : 
                    <Block middle padding={[0, theme.sizes.base]}>
                        <Input
                            label={"Butikkens Navn "}
                            defaultValue={this.state.butikNavn}
                            onChangeText={(text) => this.setState({ butikNavn: text })}
                        />
                        {this.isFieldInError('butikNavn') ? <Text caption error>Indtast venligst et navn</Text> : null}
                        <Input
                            label={"Adresse "}
                            defaultValue={this.state.adresse}
                            onChangeText={(text) => this.setState({ adresse: text })}
                        />
                        {this.isFieldInError('adresse') ? <Text caption error>Indtast venligst en gyldig adresse</Text> : null}
                        <Input
                            label={"Postnummer"}
                            inputType={'numeric'}
                            defaultValue={this.state.postnummer}
                            onChangeText={(text) => this.setState({ postnummer: text })}
                        />
                        {this.isFieldInError('postnummer') ? <Text caption error>Indtast venligst et gyldigt postnummer</Text> : null}
                        <Input
                            label={"CVR-Nummer"}
                            defaultValue={this.state.cvr}
                            onChangeText={(text) => this.setState({ cvr: text })}
                        />
                        {this.isFieldInError('cvr') ? <Text caption error>Indtast venligst et gyldigt CVR-nummer</Text> : null}
                        <Input
                            label={"E-mail"}
                            defaultValue={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        {this.isFieldInError('email') ? <Text caption error>Indtast venligst en gyldigt email</Text> : null}
                        <Input
                            label={"Forretning tlf. nr."}
                            inputType={'numeric'}
                            defaultValue={this.state.forretningTlf}
                            onChangeText={(text) => this.setState({ forretningTlf: text })}
                        />
                        {this.isFieldInError('forretningTlf') ? <Text caption error>Indtast venligst et gyldigt telefonnummer. Eks 10203040</Text> : null}
                        <Input
                            label={"Privat tlf. nr."}
                            inputType={'numeric'}
                            defaultValue={this.state.privatTlf}
                            onChangeText={(text) => this.setState({ privatTlf: text })}
                        />
                        {this.isFieldInError('privatTlf') ? <Text caption error>Indtast venligst et gyldigt telefonnummer. Eks 10203040</Text> : null}
                        <Input
                            secureTextEntry={true}
                            label={"Kodeord"}
                            defaultValue={this.state.kodeord}
                            onChangeText={text => this.setState({ kodeord: text })}
                        />
                        {this.isFieldInError('kodeord') ? <Text caption error>Angiv en kode på mindst 6 tegn og maksimalt 50 tegn</Text> : null}
                        <Input
                            secureTextEntry={true}
                            label={"Gentag kodeord"}
                            defaultValue={this.state.gentagKodeord}
                            onChangeText={text => this.setState({ gentagKodeord: text })}
                        />
                        {this.isFieldInError('gentagKodeord') ? <Text caption error>Koderne matcher ikke hinanden</Text> : null}
                        
                        <Button shadow gradient onPress={() => this.signUpHandler()}>
                            <Text bold center>Opret</Text>
                        </Button>
                    </Block>
                    }
                </Block>
            </ImageBackground>
        )
    }
}