import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../utils/colors'
import { Button } from 'react-native-elements'
import ExitBtn from '../components/account/ExitBtn';

export default function HorarioScreen(props) {
    const { navigation } = props;

    return (
        <View>
            <View style={styles.ExitBtnContainer}>
                <ExitBtn onPress={() => {
                    navigation.navigate("LoginS");
                }} />
            </View>

            <View style={styles.viewForm}>
                <Button title={<Text style={styles.textStyle}>Matutino {'\n'} 6 a.m - 2 p.m.</Text>}
                    style={styles.inputStyle}
                    onPress={() => {
                        navigation.navigate("IndexS");
                    }}
                    containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>Matutino
                </Button>
                <Button title={<Text style={styles.textStyle}>Vespertino {'\n'}
                    2 p.m - 10 p.m.</Text>} style={styles.inputStyle}
                    onPress={() => {
                        navigation.navigate("IndexS");
                    }}
                    containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>Matutino
                </Button>
                <Button title={<Text style={styles.textStyle}>Guardia {'\n'}
                    10 p.m - 6 a.m.</Text>} style={styles.inputStyle}
                    onPress={() => {
                        navigation.navigate("IndexS");
                    }}
                    containerStyle={styles.ContainerBtn} buttonStyle={styles.btn}>Matutino
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {

        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        fontStyle: "italic",
        fontFamily: "Roboto",
        //aliniqacion del texto al principio
        textAlign: "center",
        //Espacio entre las lineas de texto
        lineHeight: 30

    },
    viewForm: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    ContainerBtn: {
        width: '70%',
        marginTop: 20,
        alignSelf: 'center'
    },
    btn: {
        backgroundColor: colors.C_PRIMARIO,
        borderRadius: 10,
        marginBottom: 50,
        height: 80
    },
    ExitBtnContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
        marginRight: 10
    }
})