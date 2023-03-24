import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'

export default function CamillaShow(props) {
    const { camilla, sala,paciente,expediente } = props;

    return (
        <View>
            <View >
                <View style={styles.btn}>
                    <Text style={styles.textStyle}>{camilla} {'\n'}
                        {sala} {'\n'} {paciente} {'\n'} {expediente}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 300,
        height: 150,
        backgroundColor: colors.C_PRIMARIO,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
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