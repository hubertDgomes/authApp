import { Stack } from 'expo-router'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class AuthLayout extends Component {
  render() {
    return (
     <Stack screenOptions={{headerShown : false}}/>
    )
  }
}
