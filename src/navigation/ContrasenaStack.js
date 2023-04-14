import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ContrasenaScreen from '../screens/ContrasenaScreen';

const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function ContrasenaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ContrasenaS" component={<ContrasenaScreen />} options={{ title: "Contrasena" }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})