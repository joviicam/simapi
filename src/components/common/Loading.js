import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import {Overlay} from 'react-native-elements';

export default function Loading(props) {
  const {visible, text} = props;
  return (
    //Overlay es un componente de react-native-elements que sirve para mostrar un componente encima de otro
    <Overlay isVisible={visible} overlayStyle={styles.overlay}>
      <View style={styles.viewLoad}>
      <ActivityIndicator size="large" color="#0D5BD7"/>
      {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  )
}

Loading.defaultProps = {
  visible: false
}

const styles = StyleSheet.create({
  overlay:{
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#0D5BD7",
    borderWidth: 2,
    borderRadius: 8
  },
  viewLoad:{
    algnItems: "center",
    justifyContent: "center"
  },
  text:{
    color: "#0D5BD7",
    textTransform: "uppercase",
    marginVertical: 10
  }
})