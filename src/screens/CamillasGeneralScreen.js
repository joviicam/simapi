import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import Camillas from '../components/common/Camillas'
import { path } from '../data'
import Loading from '../components/common/Loading'
import ExitBtn from '../components/account/ExitBtn'
import { getData } from '../utils/Storage'
import { Input } from 'react-native-elements'
import AccountBtn from '../components/account/AccountBtn';
import { useRoute } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import { io } from "socket.io-client";

export default function CamillasGeneralScreen(props) {
    const route = useRoute();
    const [camillas, setCamillas] = useState([]);
    const [filteredCamillas, setFilteredCamillas] = useState([]);

    const getCamillasEnfermera = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const institucion = await getData('idInstitucion');
                const url = path + 'api/camillas/institucion/' + institucion;
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
        }).catch((error) => {
            console.log(error);
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
            console.log(camillas.data[0].idEnfermera[0].matutino);
            setFilteredCamillas(camillas.data);

        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const { navigation } = props;

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = camillas.filter(item => {
                //Buscar por nombre
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
                    <Text style={styles.TextStyle}>Camillas general:</Text>
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
                    <Input
                        rightIcon={
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
                {filteredCamillas ? filteredCamillas.map((camilla) => {
                    return (
                        <Camillas camilla={camilla.idCamillas} sala={camilla.idSala} isla={camilla.idIsla} paciente={camilla.nombre} expediente={camilla.numeroExpediente} estadoAlarma={camilla.estadoAlarma}
                            key={camilla.idCamillas}
                            onPress={() => {
                                navigation.navigate('AlarmaS', { camilla: camilla.idCamillas, sala: camilla.idSala, paciente: camilla.nombre, expediente: camilla.numeroExpediente, isla: camilla.idIsla, alarma: camilla.estadoAlarma })
                                //saveData('alarma', camilla.estadoAlarma);
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
        marginBottom: 5
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
        marginBottom: 20,
        marginTop: 20
    },
    AccountBtnContainer: {
        position: "absolute",
        marginTop: -20,
        right: 70,
        zIndex: 1
    }
})
