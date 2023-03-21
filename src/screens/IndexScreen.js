import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Camillas from '../components/common/Camillas';
import ExitBtn from '../components/account/ExitBtn';

export default function IndexScreen(props) {
  const { navigation } = props;

  return (
    <View style={styles.Container}>
      <View style={styles.textContainer}>
        <Text style={styles.TextStyle}>Camillas asignadas:</Text>
      </View>

      <View style={styles.ExitBtnContainer}>
        <ExitBtn
          onPress={() => {
            navigation.navigate('LoginS')
          }} />
      </View>
      <Camillas onPress={() => {
        navigation.navigate("AlarmaS");
      }} />
      <Camillas onPress={() => {
        navigation.navigate("AlarmaS");
      }} />
      <Camillas onPress={() => {
        navigation.navigate("AlarmaS");
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    marginTop: 30,
    alignItems: "center"
  },

  ExitBtnContainer: {
    position: "absolute",
    marginTop: -20,
    marginLeft: 10,
    marginRight: -40,
    right: 50,
    zIndex: 1
  },
  textContainer: {
    marginTop: -5,
    marginLeft: -10,
    marginRight: 110,
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginBottom: 20
  },
  TextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left"
  },
})
/* const nombres = ['Juan', 'María', 'Pedro'];

const listaNombres = nombres.map((nombre, index) => {
  return <Text key={index}>{nombre}</Text>;
});

return (
  <View>
    {listaNombres}
  </View>
); */