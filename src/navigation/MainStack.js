import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import HorarioScreen from '../screens/HorarioScreen'
import AlarmaScreen from '../screens/AlarmaScreen'
import IndexScreen from '../screens/IndexScreen'
import { TapGestureHandler } from 'react-native-gesture-handler'
import ContrasenaScreen from '../screens/ContrasenaScreen'
import CamillasGeneralScreen from '../screens/CamillasGeneralScreen'

const Stack = createNativeStackNavigator()
export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
                <Stack.Screen name="LoginS" component={LoginScreen} 
                options={{
                    title: "Login",
                    headerShown: false
                }} />
                <Stack.Screen name="HorarioS" component={HorarioScreen}
                    options={{
                        title: "Horarios",
                    }}
                />
                <Stack.Screen name="AlarmaS" component={AlarmaScreen} options={{ title: "Alarma" }} />
                <Stack.Screen name="IndexS" component={IndexScreen} options={{ title: "Camillas" }} />
                <Stack.Screen name="ContrasenaS" component={ContrasenaScreen} options={{ title: "Cuenta" }} />
                <Stack.Screen name="CamillasGeneralS" component={CamillasGeneralScreen} options={{ title: "Camillas" }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})