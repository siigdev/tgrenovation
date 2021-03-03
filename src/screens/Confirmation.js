import React, { Component } from 'react'
import { Dimensions, ImageBackground } from 'react-native'
import { Block, Text, Input, Button, Loading } from '../components'
import { theme } from '../constants';
import firebase from 'firebase';

const wheight = Dimensions.get('window').height;
export default class Confirmation extends Component {

    constructor() {
        super();
        this.sendOrder = this.sendOrder.bind(this)
        this.state = {
            adresse: '',
            postnummer: '',
            butikNavn: '',
            kommentar: '',
            isLoading: false,
            confirmed: false
        }
        firebase.database().ref('users/').child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
            try {
                this.setState({
                    adresse: snapshot.val().adresse,
                    postnummer: snapshot.val().postnummer,
                    butikNavn: snapshot.val().butikNavn,
                    telefon: snapshot.val().forretningTlf,
                    mobil: snapshot.val().privatTlf,
                    isLoading: false
                })
            } catch {
                this.setState({ isLoading: false })
                console.warn("Der skete en fejl")
            }
        });
    }

    sendOrder() {
        this.setState({ isLoading: true });
        firebase.database().ref('ordre/').push({
            kunde: firebase.auth().currentUser.uid,
            butikNavn: this.state.butikNavn,
            tidspunkt: new Date().toLocaleString(),
            kommentar: this.state.kommentar,
            telefon: this.state.telefon,
            mobil: this.state.mobil,
            adresse: this.state.adresse
        });
        setTimeout(function () {
            //Short timeout for better user feedback when pressing button
            //Firebase is too quick :)
            this.setState({ isLoading: false, confirmed: true });
        }.bind(this), 1000);
    }

    render() {
        const { isLoading, butikNavn, adresse, postnummer, kommentar, confirmed } = this.state;
        return (
            <ImageBackground source={require('../assets/images/LeavesBackground.jpg')} style={{ width: '100%', height: '100%' }} imageStyle={{ opacity: 0.3 }}>
                <Block row center>
                    {isLoading ? <Loading /> :

                        confirmed ? <Block middle padding={[0, theme.sizes.base]}>
                        <Text h1 center bold style style={{ marginBottom: 20 }}>Kvittering</Text>
                        <Text>Din ordre er gået igennem, og vi kommer til din butik inden for de næste 5 hverdage. Ønsker du at annullere ordren eller har du yderligere spørgsmål bedes du kontakte os på: 45 22 25 21 56</Text>
                    </Block> : 
                            <Block middle padding={[0, theme.sizes.base]}>
                                <Text h1 center bold style={{ marginBottom: 20 }}>Ordredetaljer</Text>
                                <Block row><Text bold>Butiks navn: </Text><Text> {butikNavn}</Text></Block>
                                <Block row><Text bold>Adresse: </Text><Text> {adresse}, {postnummer}</Text></Block>
                                <Text bold>Kommentar til ordre (valgfrit):</Text>
                                <Input
                                    label={"Skriv din kommentar her"}
                                    multiline={true}
                                    style={{ width: '100%', height: wheight * 0.4 }}
                                    defaultValue={kommentar}
                                    maxLength={201}
                                    onChangeText={(text) => this.setState({ kommentar: text })}
                                />
                                {this.state.kommentar.length > 200 ? <Text caption error>Kommentar på maks være 200 tegn</Text>: null}
                                <Button gradient onPress={this.sendOrder}>
                                    <Text bold black center>Send ordren</Text>
                                </Button>
                            </Block>
                    }
                </Block>
            </ImageBackground>
        )
    }
}