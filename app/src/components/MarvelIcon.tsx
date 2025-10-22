// Archivo temporal para crear un componente de icono de Marvel
import React from 'react';
import { View, Text } from 'react-native';

// Este archivo se puede usar para crear un icono personalizado de Marvel si es necesario
export const MarvelIcon = () => {
    return (
        <View style={{
            width: 30,
            height: 30,
            backgroundColor: '#ED1D24',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 14
            }}>M</Text>
        </View>
    );
};