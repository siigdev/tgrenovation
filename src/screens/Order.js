import React, { Component } from 'react'
import { Block, Text, Input, Button } from '../components'
import { Dimensions, Image, TouchableOpacity } from 'react-native'
import { theme } from '../constants';
import firebase from 'firebase';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const winWidth = width - theme.sizes.base * 2
const ratio = winWidth / 398;
export default class Order extends Component {
    constructor(props) {
        super(props);
        this.handleOrder = this.handleOrder.bind(this)
        this.state = {
            isLoading: false
        }
    }
    _signOutAsync = async () => {
        firebase.auth().signOut();
        this.props.navigation.navigate('Welcome');
    }
    handleOrder() {
        this.props.navigation.navigate("Confirmation");
    }
    render() {
        const { isLoading } = this.state;
        return (
            <Block>
                <Block column>
                    <Svg width={width} height={width} viewBox="0 0 375 370">
                        <Defs>
                            <LinearGradient x1="90.743%" y1="87.641%" x2="10.14%" y2="3.465%" id="prefix__a">
                                <Stop stopColor={theme.colors.primary} offset="0%" />
                                <Stop stopColor={theme.colors.secondary} offset="100%" />
                            </LinearGradient>
                        </Defs>
                        <Path
                            d="M.11-2H376c-.005 204.081-.005 306.134 0 306.158-95.114 82-135.593-8.28-188-16.789C98.06 266.778 51.482 346.402.11 262.41-.037 251.212-.037 163.075.11-2z"
                            fill="url(#prefix__a)"
                            fillRule="evenodd"
                        />
                    </Svg>
                    <Block column style={{
                        height: height,
                        position: 'absolute', top: '10%', width: '100%',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <Text h1 white center>Klik på tønden for at bestille!</Text>
                        <Block>
                            <TouchableOpacity onPress={this.handleOrder}>
                                <Image
                                    source={require('../assets/images/barrel.png')}
                                    style={{
                                        maxWidth: 500,
                                        width: winWidth,
                                        height: 512 * ratio,
                                        maxHeight: height / 1.5,
                                        alignSelf: 'center',
                                    }}
                                /></TouchableOpacity>
                        </Block>
                        <Block middle padding={[0, theme.sizes.base]} width={'100%'}>
                            <Button onPress={this._signOutAsync}>
                                <Text bold black center>Log ud</Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        )
    }
}