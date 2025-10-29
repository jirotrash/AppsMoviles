import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface Props {
    titulo: string;
    color?: string;
    action: () => void;
    fullWidth?: boolean; // por defecto true para mantener compatibilidad
    containerStyle?: ViewStyle; // estilo adicional para el contenedor
}

export const BtnTouch = ({ titulo, color = 'blue', action, fullWidth = true, containerStyle }: Props) => {
    return (
        <TouchableOpacity
            style={[styles.button, fullWidth ? styles.full : styles.compact, { backgroundColor: color }, containerStyle]}
            onPress={action}
        >
            <Text style={styles.buttonText}>
                {titulo}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    full: {
        width: '100%'
    },
    compact: {
        alignSelf: 'flex-start',
        paddingHorizontal: 18
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});