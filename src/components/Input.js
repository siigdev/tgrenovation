import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import Text from './Text';
import Block from './Block';
import { theme } from '../constants';

export default class Input extends Component {
  render() {
    const {
      email,
      phone,
      number,
      error,
      style,
      label,
      ...props
    } = this.props;

    const inputStyles = [
      styles.input,
      error && { borderColor: theme.colors.accent },
      style,
    ];

    const inputType = email
      ? 'email-address' : number
      ? 'numeric' : phone
      ? 'phone-pad' : 'default';

    return (
        <TextInput
          style={inputStyles}
          autoComplete="off"
          placeholder={label}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          {...props}
        />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: theme.sizes.base/2,
    borderColor: theme.colors.black,
    backgroundColor: theme.colors.white,
    padding: theme.sizes.base,
    fontSize: theme.sizes.font,
    fontWeight: '500',
    color: theme.colors.black,
    borderRadius: theme.sizes.base/2,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: 1,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2,
  }
});