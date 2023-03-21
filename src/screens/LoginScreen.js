import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'//Para poder navegar entre pantallas
import LoginForm from '../components/account/LoginForm';
import BtnPrimary from '../components/common/BtnPrimary';

export default function LoginScreen() {
    return (
        <View>
            <View>
                <LoginForm />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({



})