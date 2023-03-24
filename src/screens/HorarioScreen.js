import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../utils/colors'
import { Button } from 'react-native-elements'
import ExitBtn from '../components/account/ExitBtn';

export default function HorarioScreen(props) {
  const { navigation } = props;
  const horarios = [
    {
      id: 1,
      title: "Matutino",
      horario: "7:00 - 15:00"
    },
    {
      id: 2,
      title: "Vespertino",
      horario: "15:00 - 23:00"
    },
    {
      id: 3,
      title: "Guardia",
      horario: "23:00 - 7:00"
    }
  ]
  return (
    <View>
      <View style={styles.ExitBtnContainer}>
        <ExitBtn onPress={() => {
          navigation.navigate("LoginS");
        }} />
      </View>
      <View style={styles.viewForm}>
        {
          horarios.map((horario) => {
            return (
              <View key={horario.id}>
                <Button title={<Text style={styles.textStyle}>{horario.title} {'\n'} {horario.horario}</Text>} 
                  onPress={() => {
                    navigation.navigate("IndexS");
                    console.log({ horario: horario.title, horario: horario.horario })
                  }} containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>
                </Button>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {

    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "Roboto",
    //aliniqacion del texto al principio
    textAlign: "center",
    //Espacio entre las lineas de texto
    lineHeight: 30
  },
  viewForm: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  ContainerBtn: {
    width: '90%',
    marginTop: 10,
    alignSelf: 'center'
  },
  btn: {
    backgroundColor: colors.C_PRIMARIO,
    borderRadius: 10,
    marginBottom: 50,
    height: 100,
    width: 220
  },
  ExitBtnContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 10
  }
})