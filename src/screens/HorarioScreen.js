import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../utils/colors'
import { Button } from 'react-native-elements'
import ExitBtn from '../components/account/ExitBtn';
import { getData, removeData, saveData } from '../utils/Storage';
import Toast from "react-native-toast-message";

export default function HorarioScreen(props) {
  const { navigation } = props;
  function isUserAuthenticated() {
    const token = getData("token");
    return token != null;
  }

  async function getToken() {
    const token = await getData("token");
    return token;
  }

  // obtener hora actual
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = hour + ":" + minutes + ":" + seconds;

  function hoarioCards() {
    if (time >= "7:00" && time <= "7:10") {
      setTimeout(() => {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Tiempo de sesión expirado",
        });
        navigation.navigate("LoginS");
        saveData("token", null);
      }, 60000)
      return (
        <View key={1}>
          <Button title={<Text style={styles.textStyle}>{"7:00 - 15:00"} {'\n'} {"7:00 - 15:00"}</Text>}
            onPress={() => {
              navigation.navigate("IndexS");
            }} containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>
          </Button>
        </View>
      )
    } else if (time >= "15:00" && time <= "15:10") {
      setTimeout(() => {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Tiempo de sesión expirado",
        });
        navigation.navigate("LoginS");
        saveData("token", null);
      }, 60000)
      return (
        <View key={2}>
          <Button title={<Text style={styles.textStyle}>{"15:00 - 23:00"} {'\n'} {"15:00 - 23:00"}</Text>}
            onPress={() => {
              navigation.navigate("IndexS");
            }} containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>
          </Button>
        </View>
      )
    } else if (time >= "23:00" && time <= "23:10") {
      setTimeout(() => {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Tiempo de sesión expirado",
        });
        navigation.navigate("LoginS");
        removeData("token");
        removeData("nombre");
        removeData("apellidos");
        removeData("correo");
        removeData("idUsuario");
        removeData("idInstitucion");
        removeData("rol");
        removeData("colorPrimario");
        removeData("colorSecundario");
        removeData("colorTerciario");
      }, 60000)
      return (
        <View key={3}>
          <Button title={<Text style={styles.textStyle}>{"23:00 - 7:00"} {'\n'} {"23:00 - 7:00"}</Text>}
            onPress={() => {
              navigation.navigate("IndexS");
            }} containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>
          </Button>
        </View>
      )
    } else {
      /*       setTimeout(() => {
              Toast.show({
                type: "error",
                position: "bottom",
                text1: "No hay horario disponible",
              });
              navigation.navigate("LoginS");
              saveData("token", null);
            }, 60000) */
      return (
        <View key={4}>
          <Button title={<Text style={styles.textStyle}>{"No hay horario disponible"}</Text>}
            onPress={() => {
              navigation.navigate("IndexS");
              //saveData("token", null);
            }} containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>
          </Button>
        </View>
      )
    }
  }
  console.log(time)

  return getToken() != null ? (
    <View>
      <View style={styles.ExitBtnContainer}>
        <ExitBtn onPress={() => {
          navigation.navigate("LoginS");
        }} />
      </View>
      <View style={styles.viewForm}>
        {hoarioCards()}
      </View>
    </View>
  ) : (
    <View>
      <View style={styles.ExitBtnContainer}>
        <ExitBtn onPress={() => {
          navigation.navigate("LoginS");
        }} />
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
    height: 150,
    width: 220
  },
  ExitBtnContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 10
  }
})