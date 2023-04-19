import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import { Button, Icon } from 'react-native-elements'
import { useState } from 'react'
import CamillaShow from './CamillaShow'
import Toast from 'react-native-toast-message';
import { path } from '../../data'
import { getData } from '../../utils/Storage'
import { useEffect } from 'react'
import { useNavigation, useRoute, StackActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function Alarma(props) {
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
    console.log("Alarma");
    const { camilla, sala, paciente, expediente, alarma, mensaje } = props;
    console.log("Mensaje: " + mensaje)
    console.log({ camilla: camilla, sala: sala, paciente: paciente, expediente: expediente, alarma: alarma });

    const navigation = useNavigation();

    console.log("Nav: " + navigation);

    const [token, setToken] = useState(null);
    const [idUsuario, setIdUsuario] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            const token = await getData('token');
            setToken(token);
        };

        getToken();
    }, []);

    useEffect(() => {
        const getIdUsuario = async () => {
            const idUsuario = await getData('idUsuario');
            setIdUsuario(idUsuario);
        };

        getIdUsuario();
    }, []);


    console.log("Token: " + token);

    const [isLiked, setIsLiked] = useState(alarma);
    const iconColor = isLiked ? 'red' : 'gray';

    const onPressIcon = async () => {
        setIsLiked(!isLiked);
        console.log("La alarma se encuentra encendida");
        Toast.show({
            type: "success",
            position: "bottom",
            text1: "La alarma se apagó correctamente",
        });

        const putRequest = async () => {
            const url = path + 'api/alarma/deactivate/camilla/' + camilla + '/enfermera/' + idUsuario;
            console.log("URL: " + url);

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                    navigation.navigate('IndexS');
                    return Promise.resolve();
                } else {
                    throw new Error('Error en la petición');
                }
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error en la petición",
                });
                return Promise.reject();
            }
        };

        putRequest()
            .then(() => {
                console.log('Petición exitosa');
                navigation.navigate('IndexS');
            })
            .catch(() => {
                console.log('Error en la petición');
            });
    };

    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        if (isLiked) {
            setModalVisible(true);
        }
        if (!isLiked) {
            console.log("La alarma se encuentra apagada");
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "La alarma se encuentra apagada",
            });
        }
    };

    return (
        <View style={{...styles.container, backgroundColor: colors.C_SECUNDARIO,}} >
            <CamillaShow style={styles.CamillaContainer}
                camilla={camilla} paciente={paciente} sala={sala} expediente={expediente} />
            <TouchableOpacity onPress={handlePress}>
                <View backgroundColor={iconColor} style={styles.iconStyle}>
                    <Icon type='material-community' name="power" iconStyle={styles.icon}
                        onPress={() => {
                            handlePress();
                        }} size={250} color="white" />
                </View>
            </TouchableOpacity>
            <Text style={{...styles.title, color: colors.C_TERCIARIO}}>Presiona el botón rojo {"\n"}para apagar la alarma</Text>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}//Para que el modal sea transparente 
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.Modal}>
                    <Image
                        source={require('../../../assets/images/Advertencia.png')} style={styles.iconModal}
                    />
                    <Text style={{...styles.title, color: colors.C_TERCIARIO}}>¿Desea apagar la alarma?</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar" buttonStyle={styles.btnCancelar} onPress={() => {
                            setModalVisible(false)
                        }} />
                        <Button title="Aceptar" buttonStyle={{...styles.btnAceptar, backgroundColor: colors.C_PRIMARIO}} onPress={() => {
                            onPressIcon();
                            setModalVisible(false)
                        }} />
                    </View>
                </View>
            </Modal>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 10,
        paddingBottom: 100,
        height: 80,
        width: "90%",
        
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginTop: 10,
        fontSize: 23,
        fontWeight: 'bold',
        
        textAlign: 'center',
        fontStyle: "italic"
    },
    AlarmaContainer: {
        zIndex: 1
    },
    CamillaContainer: {
        zIndex: 1,
        position: 'absolute',
        marginBottom: 100
    },
    iconStyle: {
        borderRadius: 100,
        width: 210,
        height: 210,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    icon: {
        alignSelf: 'center',
        marginLeft: -19,
        marginTop: -18
    },
    iconModal: {
        alignSelf: 'center',
        marginTop: -10,
        width: 150,
        height: 150
    },
    Modal: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: "40%",
        width: "80%",
        borderRadius: 10,
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: 200
    },
    ModalText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 10
    },
    btnAceptar: {
        
        marginTop: 20,
        width: 100,
        height: 50,
        borderRadius: 10,
        marginLeft: 10
    },
    btnCancelar: {
        backgroundColor: "#FFB818",
        marginTop: 20,
        width: 100,
        height: 50,
        borderRadius: 10,
        marginRight: 10
    },
    buttonContainer: {
        flexDirection: 'row'//Para que los botones se pongan uno al lado del otro        
    }
})