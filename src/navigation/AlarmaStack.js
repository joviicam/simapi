import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AlarmaScreen from '../screens/AlarmaScreen'
const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function AlarmaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AlarmaS" component={AlarmaScreen} options={{title:"Alarma"}} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})