import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import colors from '../../utils/colors'

export default function BtnPrimary(props) {
    const { text, onPress } = props;
    return (
        <View>
            <Button title={<Text style={styles.textStyle}>{text}</Text>} style={styles.inputStyle}
                onPress={onPress} containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: colors.C_PRIMARIO,
        fontFamily: 'Arial',
    },

    btn: {
        backgroundColor: colors.C_PRIMARIO,
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