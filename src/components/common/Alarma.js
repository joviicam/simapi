import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import { Icon } from 'react-native-elements'
import { useState } from 'react'
import CamillaShow from './CamillaShow'
/* import swal from '@sweetalert/with-react'
 */
export default function Alarma() {
    //useState sirve para indicar el estado inicial del icono
    const [isLiked, setIsLiked] = useState(false);
    //Sirve para cambiar el color del icono
    const iconColor = isLiked ? 'gray' : 'red';
    //Función para cambiar el estado del icono al presionarlo
    const onPressIcon = () => {
        setIsLiked(!isLiked);
    };
    /* const showAlert=()=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        } */
    return (
        <View style={styles.container}>
            <CamillaShow style={styles.CamillaContainer} />
            <View backgroundColor={iconColor} style={styles.iconStyle}>
                <Icon type='material-community' name="power" iconStyle={styles.icon}
                    onPress={onPressIcon} size={250} color="white" />
            </View>
            <Text style={styles.title}>Presiona el botón rojo {"\n"}para apagar la alarma</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 10,
        paddingBottom: 100,
        height: 80,
        width: "90%",
        backgroundColor: colors.C_SECUNDARIO,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginTop: 10,
        fontSize: 23,
        fontWeight: 'bold',
        color: colors.C_TERCIARIO,
        textAlign: 'center'
    },
    AlarmaContainer: {
        zIndex: 1
    },
    CamillaContainer: {
        zIndex: 1,
        position: 'absolute',
        marginBottom: 100
    },
    iconStyle: {
        borderRadius: 100,
        width: 210,
        height: 210,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    icon: {
        alignSelf: 'center',
        marginLeft: -19,
        marginTop: -18
    }

})