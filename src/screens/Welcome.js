import React, { Component } from 'react'
import { ImageBackground, Image, Dimensions } from 'react-native'
import { Block, Text, Button } from '../components'
import { theme } from '../constants';

const win = Dimensions.get('window');
const winWidth = win.width-theme.sizes.base*2
const ratio = winWidth/565; //531 is actual image width

export default class Welcome extends Component {
    state = {
        isLoading: false
    }
    render() {
        const { navigation } = this.props;
        const { isLoading } = this.state;
        return (
            <ImageBackground source={require('../assets/images/LeavesBackground.jpg')} style={{ width: '100%', height: '100%' }} imageStyle={{ opacity: 0.3 }}>
                <Block row center>
                    <Block middle padding={[0, theme.sizes.base]}>
                        <Image
                            source={require('../assets/images/Logo.png')}
                            style= {{width: winWidth,
                                height: 124 * ratio}}    
                        />
                    </Block>
                </Block>
                <Block bottom  padding={[0, theme.sizes.base]}>
                    <Button onPress={() => navigation.navigate('Login')}>
                        <Text center semibold>Log ind</Text>
                    </Button>
                    <Button gradient onPress={() => navigation.navigate('SignUp')}>
                        <Text center semibold>Opret som kunde</Text>
                    </Button>
                </Block>

            </ImageBackground>
        )
    }
}