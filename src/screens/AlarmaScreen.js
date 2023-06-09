import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Alarma from '../components/common/Alarma';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AlarmaScreen() {
  const route = useRoute();//Para poder navegar entre pantallas y recibir parametros de otras pantallas
  const { navigation, camilla, sala, paciente, expediente, isla, alarma } = route.params;//route.params es un objeto que contiene los parametros que se le pasan a la pantallas
  console.log({ camilla, sala, paciente, expediente, alarma, isla });
  console.log("entra xd a AlarmaScreen");
  return (
    <View style={styles.Contenedor}>
      <Alarma camilla={camilla} sala={sala} isla={isla} paciente={paciente} expediente={expediente} alarma={alarma} />
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