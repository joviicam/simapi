import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input, Button, Icon } from "react-native-elements";
import { Formik } from "formik";//Para manejar el formulario con formik
import * as Yup from "yup"; //Para validar el formulario con yup
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message"; //Para mostrar los mensajes de error en el formulario
import colors from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BtnPrimary from "../common/BtnPrimary";
import { isUserAuthenticated } from "../account/TokenValidate";
import {saveData,getData} from "../../utils/Storage";

export default function LoginForm({ navigation }) {
  //Recibe las propiedades de la pantalla (navigation: {navigate
  const navigator = useNavigation();
  console.log(getData("token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const showPass = () => {
    //Función para mostrar la contraseña
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    //Si el usuario ya está autenticado, lo redirige a la pantalla de horario
    if (isUserAuthenticated()) {
      navigator.navigate("HorarioS");
    }
  }, []);

  return (
    <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={() => {
            
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Correo electrónico inválido")
              .required("Correo electrónico obligatorio"),
            password: Yup.string().required("Contraseña obligatoria"),
          })}
          onReset={() => {
            setEmail("");
            setPassword("");
          }}
        >
    <KeyboardAwareScrollView>
      <View style={styles.Container1}>
            <View style={styles.Container}>
              <View style={styles.icon}>
                <Icon
                  type="material-community"
                  name="account"
                  color="#FFF"
                  size={150}
                />
              </View>
              <View style={styles.viewForm}>
                <Text style={styles.title}> Bienvenido a SIMAPI</Text>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder="Correo electrónico"
                    style={styles.inputStyle}
                    rightIcon={
                      <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.Icon}
                      />
                    }
                    //onChangeText={text => setEmail(text)}//Para que se actualice el valor del email al escribir en el input
                    id={"email"}
                    value={email}
                    onChangeText={(text) => {
                      //formik.handleChange("email")
                      setEmail(text)
                    }}
                    onBlur={() => {
                      //formik.handleBlur("password")
                    }}
                    //errorMessage={email ? null : "El email es obligatorio"}//Si el email es null muestra el mensaje
                    errorMessage={'e-mail obligatorio'}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Input
                    secureTextEntry={showPassword ? false : true}
                    placeholder="Contraseña"
                    style={styles.inputStyle}
                    rightIcon={
                      <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.Icon}
                        //onPress={()=>setPassword(!password)}//Para que se muestre la contraseña al presionar el icono
                        onPress={showPass}
                      />
                    }
                    value={password}
                    id={"password"}
                    onChangeText={(text) => {
                      //formik.handleChange("password")
                      setPassword(text)
                    }}
                    onBlur={() => {
                      //formik.handleBlur("password")
                    }}
                    errorMessage={'Contraseña obligatoria'}
                  ></Input>
                </View>
              </View>

              {/* <Button title="Iniciar sesión"  type={'submit'} style={styles.inputStyle}
                containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>
              </Button> */}
            </View>
            <BtnPrimary
              style={styles.BtnPrimaryS}
              text="Iniciar sesión"
              type={"submit"}
              onPress={() => {
                if (email === "" || password === "") {
                  Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Campos obligatorios",
                  });
                } else {
                  //fetch para hacer la petición al servidor
                  fetch("http://192.168.1.76:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                      //Para que el servidor sepa que se está enviando un json
                      "Content-Type": "application/json",
                    },
                    //Convierte el objeto a un json
                    body: JSON.stringify({
                      correo: email,
                      password: password,
                    }),
                  })
                    .then((response) => {
                      if (!response.ok) {
                        //localStorage.setItem("token", null); //setea el token en null
                        //localStorage.removeItem("token"); //Elimina el token del localStorage
                        Toast.show({
                          type: "error",
                          position: "bottom",
                          text1: "Datos incorrectos",
                        });
                        throw new Error(response.statusText);
                      } else {
                        //response.json() devuelve una promesa
                        return response.json();
                      }
                    })
                    .then((datos) => {
                      //Si el login es correcto guarda el token en el localStorage
                      //localStorage.setItem("token", datos.data.token); //Guarda el token en el localStorage
                      console.log(datos)
                      console.log(datos.data.rol)
                      if (datos.data.rol === "E") {
                        //Almacena el token en local storage
                        saveData("token", datos.data.token);
                        saveData("colorPrimario", datos.data.colores.colorPrimario);
                        saveData("colorSecundario", datos.data.colores.colorSecundario);
                        saveData("colorTerciario", datos.data.colores.colorTerciario);
                        saveData("idUsuario", datos.data.idUsuario);
                        navigator.navigate("HorarioS");
                      }else {
                        Toast.show({
                          type: "error",
                          position: "bottom",
                          text1: "Rol incorrecto",
                        });
                      }
                    })
                    .catch((error) => console.log({ERRORENELASYNC: error}));
                }
              }}
            ></BtnPrimary>
      </View>
    </KeyboardAwareScrollView>
    </Formik>
  );
}

const styles = StyleSheet.create({
  Container1: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "95%",
    alignContent: "center",
    marginTop: 20,
  },
  icon: {
    alignSelf: "center",
    width: 159,
    height: 159,
    top: 100,
    borderRadius: 100,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.C_TERCIARIO,
    zIndex: 1, //Para que el icono se muestre encima del fondo, se refiere a la capa z del plano cartesiano
  },
  IconStyle: {
    color: "#c1c1c1",
    alignSelf: "center",
  },
  Container: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "85%",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 0,
  },
  title: {
    fontSize: 30,
    color: "#000",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  inputContainer: {
    width: "85%",
    height: 60,
    marginTop: 20,
    backgroundColor: colors.C_PRIMARIO,
    alignSelf: "center",
  },
  viewForm: {
    paddingTop: 50,
    marginTop: 50,
    backgroundColor: colors.C_SECUNDARIO,
    width: "90%",
    height: "65%",
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 75,
  },
  inputStyle: {
    width: "100%",
    marginTop: 20,
    backgroundColor: colors.C_PRIMARIO,
  },
  Icon: {
    color: "#c1c1c1",
    marginTop: 10,
  },
  BtnPrimaryS: {
    alignSelf: "center",
  },
});
