import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { EventoResponse } from '../interfaces/eventoInterfaces';
import { RootStackParams } from '../navigator/EventoNavigator';

interface Props {
    evento: EventoResponse;
}

type NavigationProp = StackNavigationProp<RootStackParams>;

export const EventoCard = ({ evento }: Props) => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("DetalleEvento", { ...evento })}
        >
            <View style={styles.cardContainer}>
                <Text style={styles.title}>{evento.titulo}</Text>
                <Text style={styles.content}>{`Fecha: ${evento.fecha}`}</Text>
                <Text style={styles.content}>{`Hora: ${evento.hora}`}</Text>
                <Text style={styles.content}>{`Ubicación: ${evento.ubicacion}`}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#b189b9ff',
        borderRadius: 14,
        paddingVertical: 20,
        paddingHorizontal: 18,
        marginVertical: 10,
        marginHorizontal: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 4,
        width: '94%',
        alignSelf: 'center'
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8
    },
    content: {
        color: 'rgba(255,255,255,0.95)',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 4
    },
});