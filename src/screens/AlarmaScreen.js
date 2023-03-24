import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Alarma from '../components/common/Alarma';
import { useNavigation } from '@react-navigation/native';

export default function AlarmaScreen(props) {
  const { navigation, camilla, sala,paciente,expediente } = props;
  return (
    <View style={styles.Contenedor}>
      <Alarma />
    </View>
  )
}

const styles = StyleSheet.create({
  Contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})