import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input, Button, Icon } from 'react-native-elements'
import { useFormik } from 'formik'//Para manejar el formulario con formik
import * as Yup from 'yup'//Para validar el formulario con yup 
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'//Para mostrar los mensajes de error en el formulario
import colors from '../../utils/colors'
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BtnPrimary from '../common/BtnPrimary'

/* import BtnPrimary from '../common/BtnPrimary'
 */
export default function LoginForm({ navigation }) {//Recibe las propiedades de la pantalla (navigation: {navigate
    const navigator = useNavigation();

    const tituloBtn = "Iniciar Sesion";
    const [password, setPassword] = useState(false);//Para mostrar la contraseña
    const showPass = () => {//Función para mostrar la contraseña
        setPassword(!password)
    }

    const formik = useFormik({
        initialValues: {//Inicializa los valores del formulario, maneja un objeto
            email: "",
            password: ""
        },

        validationSchema: Yup.object({//Valida el formulario con yup 
            email: Yup.string().email("Formato de email no válido").required("Correo electrónico obligatorio"),
            password: Yup.string().required("Contraseña obligatoria")

        }),

        validateOnChange: false,//Para que no se valide el formulario al escribir

        onSubmit: async (formValue) => {//async para que espere a que se ejecute el try catch
            try {

                console.log(formValue)
                //Navega a la pantalla HorarioS
                // Utiliza el objeto de navegación sólo si está listo
                navigation.navigate('HorarioS')

            } catch {
                Toast.show({//Muestra el mensaje de error
                    //Propiedades del toast
                    type: "error",
                    position: "top",
                    text1: "Error al iniciar sesión",
                });
            }
            console.log(formValue)
        }
    });


    return (
        <KeyboardAwareScrollView>
            <View style={styles.Container1} >
                <View style={styles.Container}>
                    <View style={styles.icon}>
                        <Icon type='material-community' name="account" color="#FFF" size={150} />
                    </View>
                    <View style={styles.viewForm}>
                        <Text style={styles.title}> Bienvenido a SIMAPI</Text>
                        <View style={styles.inputContainer}>
                            <Input placeholder='Correo electrónico' style={styles.inputStyle}
                                rightIcon={<Icon type="material-community" name="at" iconStyle={styles.Icon} />}
                                //onChangeText={text => setEmail(text)}//Para que se actualice el valor del email al escribir en el input
                                onChangeText={text => formik.setFieldValue("email", text)}
                                //errorMessage={email ? null : "El email es obligatorio"}//Si el email es null muestra el mensaje
                                errorMessage={formik.errors.email}></Input>
                        </View>

                        <View style={styles.inputContainer}>
                            <Input secureTextEntry={password ? false : true} placeholder='Contraseña' style={styles.inputStyle}
                                rightIcon={<Icon type="material-community" name={password ? "eye-off-outline" : "eye-outline"} iconStyle={styles.Icon}
                                    //onPress={()=>setPassword(!password)}//Para que se muestre la contraseña al presionar el icono
                                    onPress={showPass} />}
                                onChangeText={text2 => formik.setFieldValue("password", text2)}
                                errorMessage={formik.errors.password}></Input>
                        </View>
                    </View>

                    {/*  <Button title="Iniciar sesión"  onPress={formik.handleSubmit} style={styles.inputStyle}
                    containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>
                </Button> */}

                </View>
                <BtnPrimary style={styles.BtnPrimaryS} text="Iniciar sesión"
                    onPress={() => {
                        navigator.navigate('HorarioS')
                        formik.handleSubmit()
                    }}></BtnPrimary>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    Container1: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '95%',
        alignContent: 'center',
        marginTop: 20,
    },
    icon: {
        alignSelf: 'center',
        width: 159,
        height: 159,
        top: 100,
        borderRadius: 100,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.C_TERCIARIO,
        zIndex: 1//Para que el icono se muestre encima del fondo, se refiere a la capa z del plano cartesiano
    },
    IconStyle: {
        color: "#c1c1c1",
        alignSelf: 'center'
    },
    Container: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '85%',
        alignContent: 'center',
        marginTop: 20,
        marginBottom: 0,

    },
    title: {
        fontSize: 30,
        color: "#000",
        fontWeight: "bold",
        fontStyle: "italic",
        textAlign: 'center',
        marginTop: 20
    },
    inputContainer: {
        width: '85%',
        height: 60,
        marginTop: 20,
        backgroundColor: colors.C_PRIMARIO,
        alignSelf: 'center'
    },
    viewForm: {
        paddingTop: 50,
        marginTop: 50,
        backgroundColor: colors.C_SECUNDARIO,
        width: '90%',
        height: '65%',
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: 75
    },
    inputStyle: {
        width: '100%',
        marginTop: 20,
        backgroundColor: colors.C_PRIMARIO
    },
    Icon: {
        color: "#c1c1c1",
        marginTop: 10
    },
    BtnPrimaryS: {
        alignSelf: 'center'
    }

})

