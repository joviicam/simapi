import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { TextInput } from 'react-native';
import colors from '../utils/colors';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from 'react-native-elements';
import { getData, saveData } from '../utils/Storage';
import { path } from '../data';
import { useEffect } from 'react';
import { Icon, ListItem, Button } from "react-native-elements";
import { map } from "lodash";
import { removeData } from '../utils/Storage';
import { useFormik } from 'formik';
import { useRoute } from '@react-navigation/native';

export default function ContrasenaScreen(props) {
    const route = useRoute();
    const password = route.params.password;

    //guardar datos de la enfermera
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [token, setToken] = useState('');
    const [rol, setRol] = useState('');
    const [idInstitucion, setIdInstitucion] = useState(''); // Guardar el idInstitucion de la enfermera

    const getInfoEnfermera = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const enfermera = await getData('idUsuario');
                const url = path + 'api/usuarios/' + enfermera;
                console.log("URL: " + url)
                const token = await getData('token');
                setToken(token);
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
            setRol(enfermera.data.rol);
            setIdInstitucion(enfermera.data.idInstitucion);
            console.log("Enfermera: " + enfermera.data.nombre)
            console.log("Correo: " + enfermera.data.correo)
            console.log("Apellidos: " + enfermera.data.apellidos)
            console.log("TokenPass: " + token)
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const { navigation } = props;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Las contraseñas no coinciden",
          });
        } else if (newPassword === "" || confirmPassword === "") { // Corregido este condicional
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "No puedes dejar campos vacíos",
          });
        } else {
          return new Promise(async (resolve, reject) => {
            try {
              const enfermera = await getData('idUsuario');
              const url = path + 'api/usuarios/' + enfermera;
              console.log("URL: " + url)
              const token = await getData('token');
              setToken(token);
              console.log("Token: " + token);
      
              const response = await fetch(url, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                  nombre: nombre,
                  apellidos: apellidos,
                  correo: correo,
                  password: confirmPassword,
                  rol: rol,
                  idInstitucion: idInstitucion // Usar el valor obtenido de localStorage
                }),
              });
              const json = await response.json();
              resolve(json);
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
              Toast.show({
                type: "success",
                position: "bottom",
                text1: "Contraseña cambiada correctamente, Inicia sesión de nuevo por favor",
              });
              navigation.navigate('LoginS');
            } catch (error) {
              console.log(error);
              Toast.show({
                type: "error",
                position: "bottom",
                text1: "Error al cambiar la contraseña",
              });
              reject(error);
            }
          });
        }
      }
      

    const selectedComponent = (key) => {
        if (key === "pasword") {
            //si el key es pasword se renderiza el formulario de cambio de contraseña
            setModalVisible(true);
        }
    };
    const [modalVisible, setModalVisible] = useState(false);//para el modal
    const [modal2Visible, setModal2Visible] = useState(false);//para el modal

    const optionsMenu = getOptionMenu(selectedComponent);

    const validatePass = (oldPassword) => {
        //AQUI VA LA FUNCION PARA VALIDAR LA CONTRASEÑA
        if (oldPassword == "") {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "No puedes dejar campos vacíos",
            });
        } else if (oldPassword == password) {

            setModalVisible(false);
            setModal2Visible(true);
        }
        else {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Contraseña incorrecta",
            });
        }
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.DatosStyle}>
                <Text style={styles.NombreStyle}>{nombre} {apellidos}</Text>
                <Text style={styles.CorreoStyle}>{correo}</Text>
            </View>
            {map(optionsMenu, (option, index) => (  //map es una funcion de lodash que recorre un array de objetos
                //option es cada objeto del array y index es el indice de cada objeto
                //ListItem es un componente de react-native-elements que renderiza un item de una lista 
                <ListItem key={index} style={styles.menuItem} onPress={option.onPress}>
                    <Icon
                        type={option.typeIcon}
                        name={option.nameIconLeft}
                        color={option.colorIcon}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{option.title}</ListItem.Title>
                    </ListItem.Content>
                    <Icon
                        type={option.typeIcon}
                        name={option.nameIconRight}
                        color={option.colorIcon}
                    />

                </ListItem>
            ))}
            <Button title={"Cerrar sesión"} buttonStyle={styles.logoutBtn} onPress={() => {
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
                Toast.show({
                    type: "success",
                    position: "bottom",
                    text1: "Seción cerrada correctamente",
                });
                navigation.navigate('LoginS')
            }} >

            </Button>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}//Para que el modal sea transparente
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAwareScrollView>
                    <View style={styles.Modal}>
                        <Text style={styles.label}>Ingrese la contraseña actual:</Text>
                        <TextInput
                            secureTextEntry
                            style={styles.inputModal}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Cancelar" buttonStyle={styles.btnCancelar} onPress={() => {
                                setModalVisible(false)
                            }} />
                            <Button title="Aceptar" buttonStyle={styles.btnAceptar} type={"submit"} onPress={() => {
                                //validar contraseña
                                validatePass(oldPassword);
                                setModalVisible(false)
                            }} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
            <Modal
                visible={modal2Visible}
                animationType="slide"
                transparent={true}//Para que el modal sea transparente
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAwareScrollView>
                    <View style={styles.Modal2}>
                        <Text style={styles.label}>Nueva contraseña:</Text>
                        <TextInput
                            secureTextEntry
                            style={styles.inputModal}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <Text style={styles.label}>Confirmar contraseña:</Text>
                        <TextInput
                            secureTextEntry
                            style={styles.inputModal}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Aceptar" buttonStyle={styles.btnAceptar} onPress={() => {
                                //validar contraseña
                                handleChangePassword();
                                setModalVisible(false)
                            }} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>


        </KeyboardAwareScrollView>
    )
}

function getOptionMenu(selectedComponent) {
    return [
        {
            title: "Cambiar contraseña",
            typeIcon: "material-community",
            nameIconLeft: "lock-reset",
            nameIconRight: "chevron-right",
            colorIcon: "#0d5bd7",
            onPress: () => selectedComponent("pasword"),
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
    Modal: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.C_SECUNDARIO,
        borderColor: '#F2F2F2',
        height: 300,
        width: "80%",
        borderRadius: 10,
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: 250
    },
    buttonContainer: {
        flexDirection: 'row'//Para que los botones se pongan uno al lado del otro  ,

    },
    btnAceptar: {
        backgroundColor: colors.C_PRIMARIO,
        //color de la letra
        marginTop: 10,
        width: 100,
        height: 50,
        borderRadius: 10,
        marginLeft: 10
    },
    btnCancelar: {
        backgroundColor: "#FFB818",
        marginTop: 10,
        width: 100,
        height: 50,
        borderRadius: 10,
        marginRight: 10
    },
    iconModal: {
        alignSelf: 'center',
        marginTop: -10,
        width: 150,
        height: 150
    },
    inputModal: {
        borderWidth: 1,
        borderColor: '#F2F2F2',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: "80%",
        alignSelf: 'center',
        marginTop: 10,
        borderWidth: 3
    },
    Modal2: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.C_SECUNDARIO,
        borderColor: '#F2F2F2',
        height: 330,
        width: "80%",
        borderRadius: 10,
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: 250
    },
    logoutBtn: {
        backgroundColor: "grey",
        marginTop: 40,
        width: "90%",
        height: 60,
        borderRadius: 10,
        alignSelf: 'center',
    },
})
