import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import Block from './Block';
import { theme } from '../constants'

export default class Loading extends Component {
    render() {
        return (
            <Block>
                <ActivityIndicator size="large" color={theme.colors.primary}/>
            </Block>
        )
    }
}