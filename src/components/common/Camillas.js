import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import colors from '../../utils/colors';
import { useEffect, useState } from 'react';

export default function Camillas(props) {
    const { onPress, sala, paciente, expediente, alarma, isla, estadoAlarma } = props;

    const [isChangingColor, setIsChangingColor] = useState(estadoAlarma);
    const [backgroundColor, setBackgroundColor] = useState(colors.C_PRIMARIO);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsChangingColor(prevState => !prevState);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!isChangingColor) {
            //si el estado de la alarma es 1, cambia el color a rojo
            setBackgroundColor(colors.C_PRIMARIO);
        } else {
            //si el estado de la alarma es 0, cambia el color a verde
            setBackgroundColor('red');
        }

        if(isChangingColor){
            setIsChangingColor(estadoAlarma);
        }
    }, [isChangingColor]);


    return (
        <View >
            <Button title={<Text style={styles.textStyle} >
                {"Nombre: \n"}{paciente} {'\n\n'}{"N° Expediente: \n"}{expediente}</Text>}
                onPress={onPress}
                buttonStyle={[styles.btn, { backgroundColor }]} >
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({

    btn: {
        width: 300,
        height: 200,
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