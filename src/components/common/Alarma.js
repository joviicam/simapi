import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import { Button, Icon } from 'react-native-elements'
import { useState } from 'react'
import CamillaShow from './CamillaShow'
import Toast from 'react-native-toast-message';
import { path } from '../../data'
import { getData } from '../../utils/Storage'
import { useNavigation } from '@react-navigation/native';

export default function Alarma(props) {

    const navigation = useNavigation();

    console.log("Alarma")
    const { camilla, sala, paciente, expediente, alarma } = props;
    console.log({ camilla: camilla, sala: sala, paciente: paciente, expediente: expediente, alarma: alarma })

    const [token, setToken] = useState(null);

    const getToken = async () => {
        const token = await getData('token');
        setToken(token);
    }


    getToken();

    console.log("Token: " + token);


    //useState sirve para indicar el estado inicial del icono
    const [isLiked, setIsLiked] = useState(alarma);
    //Sirve para cambiar el color del icono
    const iconColor = isLiked ? 'red' : 'gray';
    //Función para cambiar el estado del icono al presionarlo
    const onPressIcon = async () => {
        setIsLiked(!isLiked);
        console.log("La alarma se encuentra encendida");
        Toast.show({
            type: "success",
            position: "bottom",
            text1: "La alarma se apagó correctamente",
        });
        const url = path + 'api/camillas/alarma/' + camilla;
        console.log("URL: " + url)
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                estadoAlarma: false
            })
        });
        const json = await response.json();
        console.log(json);
        navigation.navigate('AlarmaS', { camilla: camilla, sala: sala, paciente: paciente, expediente: expediente, isla: isla, alarma: false })
        // cambiar el valor de la alarma en el route
        props.navigation.navigate('AlarmaS', { camilla: camilla, sala: sala, paciente: paciente, expediente: expediente, isla: isla, alarma: false })
    }

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
    }
    return (
        <View style={styles.container} >
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
            <Text style={styles.title}>Presiona el botón rojo {"\n"}para apagar la alarma</Text>
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
                    <Text style={styles.title}>¿Desea apagar la alarma?</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar" buttonStyle={styles.btnCancelar} onPress={() => {
                            setModalVisible(false)
                        }} />
                        <Button title="Aceptar" buttonStyle={styles.btnAceptar} onPress={() => {
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
        backgroundColor: colors.C_SECUNDARIO,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginTop: 10,
        fontSize: 23,
        fontWeight: 'bold',
        color: colors.C_TERCIARIO,
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
        backgroundColor: colors.C_PRIMARIO,
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