import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import colors from '../../utils/colors'
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CamillaShow() {
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
    const route = useRoute();
    const token = route.params.token;
    console.log("token: " + token)
    const { camilla, sala, isla, paciente, expediente, alarma } = route.params;
    console.log("CamillaShow")
    console.log({ camilla: camilla, sala: sala, paciente: paciente, expediente: expediente, isla: isla, alarma: alarma })
    return (
        <View>
            <View >
                <View style={{...styles.btn, backgroundColor: colors.C_PRIMARIO}}>
                    <Text style={styles.textStyle}>
                        {"Sala: "}{sala}{'\nNombre: '}{paciente}{'\nN° Expediente: '}{expediente}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 300,
        height: 170,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "center",
    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        fontStyle: "italic",
        fontFamily: "Roboto",
        //aliniqacion del texto al principio
        textAlign: "left",
        //Espacio entre las lineas de texto
        lineHeight: 30,
    }
})