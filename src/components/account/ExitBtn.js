import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeData } from "../../utils/Storage";
import Toast from "react-native-toast-message";


export default function ExitBtn(props) {
  const { onPress } = props;


  return (
    <View>
      <Button buttonStyle={styles.btn}
        icon={<Icon type="material-community" color={"#FFF"} name="logout" iconStyle={styles.Icon} size={40} />}
        onPress={() => {     
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
          onPress();
        }}>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    //boton color rojo
    backgroundColor: "red",
    borderRadius: 10,
    width: 50,
    height: 60,
  },
  Icon: {
    color: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  }
})