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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountBtn from '../components/account/AccountBtn';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { io } from "socket.io-client";
import * as Notifications from 'expo-notifications';



export default function IndexScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [camillas, setCamillas] = useState([]);
  const [filteredCamillas, setFilteredCamillas] = useState([]);
  const [tokenNotification, setTokenNotification] = useState('');

  useEffect(() => {
    const getNotificationToken = async () => {
      const tokenNotification = await getData('tokenNotification');
      setTokenNotification(tokenNotification);
    }
    getNotificationToken();
  }, []);

  console.log("TokenN: " + tokenNotification)

  const getCamillasEnfermera = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const enfermera = await getData('idUsuario');
        const turno = await getData('turno');
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
    return new Promise(async (resolve, reject) => {
      console.log('Mensaje recibido:', message);

      let mensjaAntes = message.split("@")[0];
      let mensjaDespues = message.split("@")[1];

      console.log("Mensaje antes del @: " + mensjaAntes);
      console.log("Mensaje despues del @: " + mensjaDespues);

      try {
        const camillas = await getCamillasEnfermera();
        setCamillas(camillas.data);
        console.log("Camillas Enfermera actualizadas: ");
        setFilteredCamillas(camillas.data);

        if (mensjaDespues != undefined) {
          for (let i = 0; i < camillas.data.length; i++) {
            if (camillas.data[i].numeroExpediente == mensjaDespues) {
              console.log("Expediente encontrado: " + camillas.data[i].numeroExpediente);
              const tkn = await getData('tokenNotification');
              const message = {
                to: tkn,
                sound: 'default',
                title: 'Camilla ' + camillas.data[i].numeroCamilla,
                body: mensjaAntes,
                data: { data: 'goes here' },
                _displayInForeground: true,
              };
              console.log("Mensaje: " + message);

              const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Accept-encoding': 'gzip, deflate',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
              });

              const responseData = await response.json();
              console.log(responseData);
              resolve(responseData);
            }
          }
        } else {
          resolve(null);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };



  useEffect(() => {
    const socket = io('http://54.198.174.61:3000');

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
        //Buscar por expediente del paciente o por nombre del paciente    
        const itemData = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
        const expedienteData = item.numeroExpediente ? item.numeroExpediente.toString() : '';

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1 || expedienteData.indexOf(textData) > -1;
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
        <View style={styles.AccountBtnContainer}>
          <AccountBtn
            onPress={() => {
              navigation.navigate('ContrasenaS')
            }}
          />
        </View>
        <View style={styles.ExitBtnContainer}>
          <ExitBtn
            onPress={() => {
              navigation.navigate('LoginS')
            }} />
        </View>
        <View style={styles.SearchInput}>
          <Input rightIcon={
            <Icon
              type="material-community"
              name="magnify"
              size={30}
            />
          }
            placeholder='Buscar'
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
  AccountBtnContainer: {
    position: "absolute",
    marginTop: -20,
    right: 70,
    zIndex: 1
  }
})
