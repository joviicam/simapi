import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ExitBtn(props) {
  const { onPress } = props;
  return (
    <View>
      <Button buttonStyle={styles.btn} 
      icon={<Icon type="material-community" name="logout" iconStyle={styles.Icon} size={40} />}
      onPress={onPress}>
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
  },
})