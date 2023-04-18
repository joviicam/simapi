import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'//Para poder navegar entre pantallas
import LoginForm from '../components/account/LoginForm';
import BtnPrimary from '../components/common/BtnPrimary';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';

export default function LoginScreen() {
    const handleBackButton = () => {
        // No hace nada
        return true;
      };

      useEffect(() => {
        // Suscribirse al evento de retroceso
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      
        // Desuscribirse del evento de retroceso al desmontar el componente
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      }, []);
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