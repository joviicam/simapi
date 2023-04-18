import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input, Button, Icon } from "react-native-elements";
import { useFormik } from "formik"
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import colors from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BtnPrimary from "../common/BtnPrimary";
import { saveData, getData } from "../../utils/Storage";
import { path } from "../../data";
import { useRoute } from "@react-navigation/native";
import Loading from "../common/Loading";


export default function LoginForm({ navigation }) {

  const route = useRoute();

  const navigator = useNavigation();
  const [pass,SetPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const showPass = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      correo: "",
      password: "",
    },
    validationSchema: Yup.object({
      correo: Yup.string()
        .email("Formato de email no valido")
        .required("Email es obligatorio"),
      password: Yup.string().required("Contraseña obligatoria"),
    }),
    validateOnChange: false,
    onSubmit: async (formData) => {
      console.log(formData);
      try {
        const response = await fetch(`${path}api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log(result);
        if (!result.error) {
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Inicio de sesión exitoso",
          });
          
          if (result.data.rol == "E") {
            
            saveData("token", result.data.token);
            saveData("nombre", result.data.nombre);
            saveData("apellidos", result.data.apellidos);
            saveData("correo", result.data.correo);
            saveData("idUsuario", result.data.idUsuario);
            saveData("idInstitucion", result.data.colores.idInstitucion);
            saveData("rol", result.data.rol);
            saveData("colorPrimario", result.data.colores.colorPrimario);
            saveData("colorSecundario", result.data.colores.colorSecundario);
            saveData("colorTerciario", result.data.colores.colorTerciario);
            Toast.show({
              type: "success",
              position: "top",
              text1: "Inicio de sesión exitoso",
            });
            //Saca el password del usuario            
            //Espera 1 segundo para que se guarde el password y lo envia a la siguiente pantalla
            setTimeout(() => {
              saveData("password", formData.password);
              navigator.replace("HorarioS");
            }, 2000);
          } else {
            Toast.show({
              type: "error",
              position: "top",
              text1: "No tienes permisos para acceder a esta aplicación",
            });
          }
        } else {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Credenciales incorrectas",
          });
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al iniciar sesión",
        });
      }
    },
  });

  return (
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
                placeholder="Correo Electrónico"
                containerStyle={styles.input}
                inputStyle={{ color: 'white' }}
                rightIcon={
                  <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.Icon}
                  />
                }
                onChangeText={(text) => formik.setFieldValue("correo", text)}
                errorMessage={formik.errors.correo}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                inputStyle={{ color: 'white' }}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                  <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.Icon}
                    onPress={showPass}
                  />
                }
                onChangeText={(text) => {
                  formik.setFieldValue("password", text)
                  SetPass(text);
              }}
                errorMessage={formik.errors.password}
              />
            </View>
          </View>
        </View>
        <BtnPrimary
          style={styles.BtnPrimaryS}
          text="Iniciar sesión"
          type={"submit"}
          onPress={formik.handleSubmit}
        ></BtnPrimary>
      </View>
    </KeyboardAwareScrollView>
  );
}


const styles = StyleSheet.create({
  Container1: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "88%",
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
    zIndex: 1,
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
    padding: 4,
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
