import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useAppDispatch } from "../app/hooks";
import { decrementar, incrementar, decrementarPorVarios, incrementarPorVarios, resetear } from '../caracteristicas/Contador';

const Boton_redux = () => {
    // crear la funcion para llamar a dispatch
    const dispatch = useAppDispatch();

    return (
        <>
            <TouchableOpacity
                onPress={() => dispatch(incrementar())}
                style={styles.boton_negro}>
                <Text style={styles.texto_blanco}>
                    Incrementar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => dispatch(decrementar())}
                style={styles.boton_negro}>
                <Text style={styles.texto_blanco}>
                    Decrementar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => dispatch(incrementarPorVarios(10))}
                style={styles.boton_azul}>
                <Text style={styles.texto_blanco}>
                    Avanzar en 10
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => dispatch(decrementarPorVarios(10))}
                style={styles.boton_azul}>
                <Text style={styles.texto_blanco}>
                    Regresar en 10
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => dispatch(resetear())}
                style={styles.boton_rojo}>
                <Text style={styles.texto_blanco}>
                    Resetear contador
                </Text>
            </TouchableOpacity>
        </>
    );
};

export default Boton_redux;

const styles = StyleSheet.create({
    boton_negro: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    boton_azul: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    boton_rojo: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    texto_blanco: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
});