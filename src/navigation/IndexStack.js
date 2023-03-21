import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IndexScreen from '../screens/IndexScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function IndexStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="IndexS" component={IndexScreen} options={{title:"Camillas"}} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})