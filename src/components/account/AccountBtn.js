import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';



export default function AccountBtn(props) {
    const { onPress } = props;
  return (
    <View>
      <Button buttonStyle={styles.btn}
        icon={<Icon type="material-community" color={"white"} name="account" iconStyle={styles.Icon} size={50} />}
        onPress={onPress}>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    btn: {
        //boton color rojo
        backgroundColor: "gray",
        borderRadius: 10,
        width: 50,
        height: 60,
        paddingStart: -25,

      },
      Icon: {
        color: "#fff",
      },
})