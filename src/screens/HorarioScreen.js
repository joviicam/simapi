import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {getColors} from '../utils/colors'
import { Button } from 'react-native-elements'
import ExitBtn from '../components/account/ExitBtn';
import { getData, removeData, saveData } from '../utils/Storage';
import Toast from "react-native-toast-message";
import { path } from '../data';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/common/Loading';
import { useFocusEffect } from '@react-navigation/native';
import AccountBtn from '../components/account/AccountBtn';
import { useRoute } from '@react-navigation/native';
export default function HorarioScreen(props) {
  const route = useRoute();
  const { navigation } = props;
  const [token, setToken] = useState(null);
  

  const getToken = async () => {
    const token = await getData('token');
    setToken(token);
  }

  const [colors, setColors] = useState({});
  useEffect(() => {
    async function fetchColors() {
      const retrievedColors = {
        C_PRIMARIO: await AsyncStorage.getItem('colorPrimario'),
        C_SECUNDARIO: await AsyncStorage.getItem('colorSecundario'),
        C_TERCERARIO: await AsyncStorage.getItem('colorTercerario'),
      }
      console.log({retrievedColors: retrievedColors})
      setColors(retrievedColors);
    }

    fetchColors();
  }, []);

  getToken();

  const AsignarTurno = (turnoSelect) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("Token xd: " + token);
        const enfermera = await getData('idUsuario');
        console.log("EnfermeraA: " + enfermera);
        const url = path + 'api/enfermeras/' + enfermera;
        console.log("URL: " + url)
        console.log("turno select: " + turnoSelect);
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            turno: turnoSelect
          })
        });
        const json = await response.json();
        console.log(json);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };

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
            }} containerStyle={styles.ContainerBtn} buttonStyle={{...styles.btn, backgroundColor: colors.C_PRIMARIO,}}>
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
            }} containerStyle={styles.ContainerBtn} buttonStyle={{...styles.btn, backgroundColor: colors.C_PRIMARIO,}}>
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
            }} containerStyle={styles.ContainerBtn} buttonStyle={{...styles.btn, backgroundColor: colors.C_PRIMARIO,}}>
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
          <Button title={<Text style={styles.textStyle}>{"Matutino"}</Text>}
            onPress={() => {
              //navegar a index y mandar por parametro el turno
              navigation.navigate("IndexS", { mensaje: 'matutino' });
              saveData("turno", "matutino");
              AsignarTurno("matutino");
            }} containerStyle={styles.ContainerBtn} buttonStyle={{...styles.btn, backgroundColor: colors.C_PRIMARIO,}}>
          </Button>
          <Button title={<Text style={styles.textStyle} >{"Vespertino"}</Text>}
            onPress={() => {
              navigation.navigate("IndexS", { mensaje: 'vespertino' });
              saveData("turno", "vespertino");
              AsignarTurno("vespertino");

            }} containerStyle={styles.ContainerBtn} buttonStyle={{...styles.btn, backgroundColor: colors.C_PRIMARIO,}}>
          </Button>
          <Button title={<Text style={styles.textStyle} >{"Nocturno"}</Text>}
            onPress={() => {
              navigation.navigate("IndexS", { mensaje: 'nocturno' });
              saveData("turno", "nocturno");
              AsignarTurno("nocturno");
            }} containerStyle={styles.ContainerBtn} buttonStyle={{...styles.btn, backgroundColor: colors.C_PRIMARIO,}}>
          </Button>

        </View>
      )
    }
  }
  console.log(time)

  return getToken() != null ? (
    <View>
      <View style={styles.AccountBtnContainer}>
        <AccountBtn
          onPress={() => {
            navigation.navigate('ContrasenaS')
          }}
        />
      </View>
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
    width: '60%',
    marginTop: 10,
    alignSelf: 'center'
  },
  btn: {
    borderRadius: 10,
    marginBottom: 50,
    height: 100,
    width: 220
  },
  ExitBtnContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 10
  },
  AccountBtnContainer: {
    position: "absolute",
    marginTop: 10,
    right: 70,
    zIndex: 1
  }
})