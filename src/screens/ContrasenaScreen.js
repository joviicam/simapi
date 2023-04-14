import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { TextInput, Button } from 'react-native';
import colors from '../utils/colors';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function ContrasenaScreen(props) {
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

    return (
        <KeyboardAwareScrollView>

            <View style={styles.Container}>
                <Text style={styles.TextStyle}>Cambiar contraseña</Text>
                <TextInput
                    style={styles.input}
                    value={oldPassword}
                    placeholder="Contraseña actual"
                    secureTextEntry={true}
                    onChangeText={(text) => setOldPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    placeholder="Nueva contraseña"
                    secureTextEntry={true}
                    onChangeText={(text) => setNewPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    placeholder="Confirmar nueva contraseña"
                    secureTextEntry={true}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <View style={styles.btnContainer}>
                    <Button
                        buttonStyle={styles.btn}
                        title="Cambiar contraseña"
                        onPress={() => {
                            handleChangePassword();
                        }}
                        disabled={!oldPassword || !newPassword || !confirmPassword}
                    />
                </View>
                
            </View>
            
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 120,
        marginBottom: 150,
        backgroundColor: colors.C_SECUNDARIO,
        height: 400,
        width: "90%",
        borderRadius: 10,
        borderColor: 'white',
        justifyContent: "center",
    },
    input: {
        height: 50,
        marginVertical: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    btn: {
        backgroundColor: colors.C_PRIMARIO,
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
        marginBottom: 36,
        marginHorizontal: 20,
    },

})