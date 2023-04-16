import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Camillas from '../components/common/Camillas';
import ExitBtn from '../components/account/ExitBtn';
import { getData, saveData } from '../utils/Storage';
import { path } from '../data';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/common/Loading';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements'
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../utils/colors';
import { io } from "socket.io-client";
import * as Notifications from 'expo-notifications';



export default function IndexScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const turno = route.params.mensaje; //FER AQUI RECIBES EL TURNO
  console.log("Horario: " + turno);
  const [camillas, setCamillas] = useState([]);
  const [filteredCamillas, setFilteredCamillas] = useState([]);

  const getCamillasEnfermera = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const enfermera = await getData('idUsuario');
        const url = path + 'api/camillas/enfermera/' + enfermera + '/turno/' + turno;
        console.log("URL: " + url)
        const token = await getData('token');
        console.log("Token: " + token);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleMessage = (message) => {
    console.log('Mensaje recibido:', message);
    // webViewRef.current.postMessage(JSON.stringify({ type: 'record_updated', message })); // Línea eliminada
    getCamillasEnfermera().then((camillas) => {
      setCamillas(camillas.data);
      console.log("Camillas Enfermera actualizadas: ");
      setFilteredCamillas(camillas.data);
      console.log(camillas.data);
      setMensaje(message);
    }).catch((error) => {
      console.log(error);
    });
  };


  useEffect(() => {
    const socket = io('http://192.168.1.83:3000');

    socket.on('connect', () => {
      console.log('Cliente conectado');
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });

    socket.on('record_updated', handleMessage);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getCamillasEnfermera().then((camillas) => {
      setCamillas(camillas.data);
      console.log("Camillas Enfermera: ")
      setFilteredCamillas(camillas.data);
      console.log(camillas.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = camillas.filter(item => {
        //Buscar por nombre
        const itemData = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredCamillas(newData);
      console.log(newData);
    } else {
      setFilteredCamillas(camillas);
    }
  }

  return (
    <ScrollView scrollEnabled={true}>
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
        <View style={styles.SearchInput}>
          <Input placeholder='Buscar'
            onChangeText={(text) => searchFilterFunction(text)}>
          </Input>
        </View>
        <Button onPress={() => {
          navigation.navigate('CamillasGeneralS')
        }} title={'Camillas general'} buttonStyle={styles.btn1}></Button>
        {filteredCamillas ? filteredCamillas.map((camilla) => {
          return (
            <Camillas camilla={camilla.idCamillas} sala={camilla.idSala} isla={camilla.idIsla} paciente={camilla.nombre} expediente={camilla.numeroExpediente} estadoAlarma={camilla.estadoAlarma}
              key={camilla.idCamillas}
              onPress={() => {
                navigation.navigate('AlarmaS', { camilla: camilla.idCamillas, sala: camilla.idSala, paciente: camilla.nombre, expediente: camilla.numeroExpediente, isla: camilla.idIsla, alarma: camilla.estadoAlarma })
                saveData('alarma', camilla.estadoAlarma);
                console.log({ camilla: camilla.idCamillas, sala: camilla.idSala, isla: camilla.idIsla, paciente: camilla.nombre, expediente: camilla.numeroExpediente, isla: camilla.idIsla });
              }}
            />
          )
        }) : (
          <View>
            <Loading isVisible={true} text="Cargando camillas" />
          </View>
        )}
        <Button onPress={() => {
          navigation.navigate('ContrasenaS')
        }} title={'Da click para cambiar la contraseña'} buttonStyle={styles.btn}></Button>
      </View>
    </ScrollView>
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
  SearchInput: {
    padding: 5,
    width: 300,
    height: 60,
    color: "white",
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    marginBottom: 20
  },
  btn: {
    marginTop: 5,
    marginBottom: 5,
    width: 300,
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.C_PRIMARIO,
  },
  btn1: {
    marginTop: 5,
    marginBottom: 15,
    width: 300,
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.C_PRIMARIO,
  },
})
