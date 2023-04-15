import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { TextInput, Button } from 'react-native';
import colors from '../utils/colors';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from 'react-native-elements';
import { getData, saveData } from '../utils/Storage';
import { path } from '../data';
import { useEffect } from 'react';
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";

export default function ContrasenaScreen(props) {
    //guardar datos de la enfermera
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [apellidos,setApellidos] = useState('');

    const getInfoEnfermera = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const enfermera = await getData('idUsuario');
                const url = path + 'api/usuarios/' + enfermera;
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

    useEffect(() => {
        getInfoEnfermera().then((enfermera) => {
            setNombre(enfermera.data.nombre);
            setCorreo(enfermera.data.correo);
            setApellidos(enfermera.data.apellidos);
            
            console.log("Enfermera: " + enfermera.data.nombre)
            console.log("Correo: " + enfermera.data.correo)
            console.log("Apellidos: " + enfermera.data.apellidos)
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const { navigation } = props;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        //AQUI VA LA FUNCION PARA CAMBIAR LA CONTRASEÑA
        if (newPassword !== confirmPassword) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Las contraseñas no coinciden",
            });

        } else {
            Toast.show({
                type: "success",
                position: "bottom",
                text1: "Contraseña cambiada correctamente, Inicia sesión de nuevo por favor",
            });
            navigation.navigate('LoginS')
        }
    }

    const optionsMenu = getOptionMenu();

    return (
        <KeyboardAwareScrollView>
            <View style={styles.DatosStyle}>
                <Text style={styles.NombreStyle}>{nombre} {apellidos}</Text>
                <Text style={styles.CorreoStyle}>{correo}</Text>
            </View>
            {map(optionsMenu, (option, index) => (  //map es una funcion de lodash que recorre un array de objetos
                //option es cada objeto del array y index es el indice de cada objeto
                //ListItem es un componente de react-native-elements que renderiza un item de una lista 
                <ListItem key={index} style={styles.menuItem}>
                    <Icon
                        type={option.typeIcon}
                        name={option.nameIconLeft}
                        color={option.colorIcon}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{option.title}</ListItem.Title>
                    </ListItem.Content>

                </ListItem>
            ))}

            <View style={styles.container}>
                <Text style={styles.label}>Contraseña actual:</Text>
                <TextInput
                    secureTextEntry
                    style={styles.input}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />

                <Text style={styles.label}>Nueva contraseña:</Text>
                <TextInput
                    secureTextEntry
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />

                <Text style={styles.label}>Confirmar contraseña:</Text>
                <TextInput
                    secureTextEntry
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <Button
                    buttonStyle={styles.btn}
                    title="Cambiar contraseña"
                    onPress={() => {
                        handleChangePassword();
                    }}
                    disabled={!oldPassword || !newPassword || !confirmPassword}
                />
            </View>

        </KeyboardAwareScrollView>
    )
}

function getOptionMenu() {
    return [
        {
            title: "Cambiar contraseña",
            typeIcon: "material-community",
            nameIconLeft: "lock-reset",
            nameIconRight: "chevron-right",
            colorIcon: "#0d5bd7",
        }
    ];
}


const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: colors.C_SECUNDARIO,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    btn: {
        backgroundColor: colors.C_TERCIARIO,
        borderRadius: 10,
        marginHorizontal: 20,
        color: "red",
    },
    TextStyle: {
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        marginTop: 20,
    },
    btnContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20,
        marginHorizontal: 20,
        marginTop: -200,
    },
    DatosStyle: {
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 0,
    },
    NombreStyle: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 10,
    },
    CorreoStyle: {
        fontSize: 17,
        alignSelf: "center",
        marginBottom: 30,
    },
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#E3E3E3",
    },
    passSyle: {
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginBottom: 10,
        marginTop: 10,
    },
})