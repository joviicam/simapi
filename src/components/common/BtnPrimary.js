import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BtnPrimary(props) {
  //sacar el backGroundColor del style de props
  const { style: { backgroundColor } } = props;
  const color = backgroundColor;

    const [colors, setColors] = useState({});
  useEffect(() => {
    async function fetchColors() {
      const retrievedColors = {
        C_PRIMARIO: await AsyncStorage.getItem('colorPrimario'),
        C_SECUNDARIO: await AsyncStorage.getItem('colorSecundario'),
        C_TERCERARIO: await AsyncStorage.getItem('colorTercerario'),
      }
      console.log({retrievedColors: retrievedColors})
      setColors(retrievedColors);
    }

    fetchColors();
  }, []);
    const { text, onPress } = props;
    return (
        <View>
            <Button title={<Text style={styles.textStyle}>{text}</Text>} style={{...styles.inputStyle, backgroundColor: colors.C_PRIMARIO}}
                onPress={onPress} buttonStyle={{...styles.btn, backgroundColor: color ? color : colors.C_PRIMARIO}}>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        fontFamily: 'Arial',
    },

    btn: {
        fontFamily: 'Roboto',
        borderRadius: 10,
        width: 200,
        height: 45
    },
    textStyle: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        fontFamily: "Roboto",
    }
})