import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Camillas from '../components/common/Camillas';
import ExitBtn from '../components/account/ExitBtn';

export default function IndexScreen(props) {
  const { navigation } = props;
  
  console.log("entra xd a IndexScreen"); 
  const camillas = [
    {
      id: 1,
      camilla: "Camilla 1",
      sala: "Sala 1",
      paciente:"Diego Albabera Fierro",
      expediente:"c8dhf-jrj7-098"
    },
    {
      id: 2,
      camilla: "Camilla 2",
      sala: "Sala 1",
      paciente:"Misael Bahena Diaz",
      expediente:"c8dhf-jrj7-110"
    },
    {
      id:3,
      camilla: "Camilla 4",
      sala: "Sala 2",
      paciente:"Yahir Diaz Gonzalez",
      expediente:"c8dhf-jrj7-098"
    }
  ]

  return (
    <View style={styles.Container}>
      <View style={styles.textContainer}>
        <Text style={styles.TextStyle}>Camillas asignadas:</Text>
      </View>

      <View style={styles.ExitBtnContainer}>
        <ExitBtn
          onPress={() => {
            navigation.navigate('LoginS')
          }} />
      </View>     
      {
        camillas.map((camilla) => {
          return (
            <Camillas
              key={camilla.id}
              onPress={() => {
                navigation.navigate('AlarmaS', { camilla: camilla.camilla, sala: camilla.sala, paciente: camilla.paciente, expediente: camilla.expediente })
                console.log({camilla: camilla.camilla, sala: camilla.sala, paciente: camilla.paciente, expediente: camilla.expediente });
              }}
              camilla={camilla.camilla}
              sala={camilla.sala}
              paciente={camilla.paciente}
              expediente={camilla.expediente}
            />
          )
        })
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    marginTop: 30,
    alignItems: "center"
  },

  ExitBtnContainer: {
    position: "absolute",
    marginTop: -20,
    marginLeft: 10,
    marginRight: -40,
    right: 50,
    zIndex: 1
  },
  textContainer: {
    marginTop: -5,
    marginLeft: -10,
    marginRight: 110,
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginBottom: 20
  },
  TextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left"
  },
})
/* const nombres = ['Juan', 'María', 'Pedro'];

const listaNombres = nombres.map((nombre, index) => {
  return <Text key={index}>{nombre}</Text>;
});

return (
  <View>
    {listaNombres}
  </View>
); */