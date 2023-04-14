import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CamillasGeneralScreen from '../screens/CamillasGeneralScreen';
const Stack = createNativeStackNavigator();// Crear un stack navigator

export default function CamillasGeneralStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CamillasGeneralS" component={<CamillasGeneralScreen />} options={{ title: "Camillas general" }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})