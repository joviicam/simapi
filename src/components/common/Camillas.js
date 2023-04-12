import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import colors from '../../utils/colors';


export default function Camillas(props) {
    const { onPress, sala, paciente, expediente, alarma, isla } = props;
    console.log("Camillas")
    console.log({ sala: sala, paciente: paciente, expediente: expediente, alarma: alarma, isla: isla })
    return (
        <View >
            <Button title={<Text style={styles.textStyle}>
                {"Nombre: \n"}{paciente} {'\n\n'}{"N° Expediente: \n"}{expediente}</Text>}
                onPress={onPress} titleStyle={styles.textStyle}
                buttonStyle={styles.btn}>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({

    btn: {
        width: 300,
        height: 200,
        backgroundColor: colors.C_PRIMARIO,
        borderRadius: 10,
        marginBottom: 20,
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