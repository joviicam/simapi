import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeData } from "../../utils/Storage";
import Toast from "react-native-toast-message";


export default function ExitBtn(props) {
  const { onPress } = props;

  const Logout = () => {
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
      text1: "Sesión cerrada",
    });
  }

  return (
    <View>
      <Button buttonStyle={styles.btn}
        icon={<Icon type="material-community" name="logout" iconStyle={styles.Icon} size={40} />}
        onPress={
          onPress
          /* Toast.show({
            type: "success",
            position: "bottom",
            text1: "Sesión cerrada",
          }); */
        }>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    //boton color rojo
    backgroundColor: "#8B0000",
    borderRadius: 10,
    width: 50,
    height: 60,
  },
  Icon: {
    color: "#fff",
  }
})