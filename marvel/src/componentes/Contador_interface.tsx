import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../app/hooks';

const Contador_interface = () => {

    const counter = useAppSelector(state => state.contador.value);

    return (
        <View>
            <Text style={styles.fuente_titulo}>Interfaz contador</Text>
            <Text style={styles.fuente_contador}>{counter}</Text>
        </View>
    );
};

export default Contador_interface;

const styles = StyleSheet.create({
    fuente_titulo: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    fuente_contador: {
        fontSize: 62,
        color: 'blue',
        fontWeight: 'bold',
        alignContent: 'center'
    }
});