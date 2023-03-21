import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HorarioScreen from '../screens/HorarioScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function HorarioStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown:true}}>
            <Stack.Screen name="HorarioS" component={HorarioScreen} options={{title:"HorarioS"}} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})