import React, { useState } from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet } from 'react-native';
// Fab removed per user request (no floating add button)
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { appTheme } from '../themes/appTheme';
import { EventoCard } from '../components/EventoCard';
import { EventoResponse } from '../interfaces/eventoInterfaces';
import { BtnTouch } from '../components/BtnTouch';
import { RootStackParams } from '../navigator/EventoNavigator';

type NavigationProp = StackNavigationProp<RootStackParams>;

export const HomeEvento = () => {
    const navigation = useNavigation<any>();

    const [eventos] = useState<EventoResponse[]>([
        {
            id_evento: 1,
            titulo: "Juego de la maquinola",
            descripcion: "Ojala ganen la liga",
            fecha: "2025-10-30",
            hora: "10:00",
            ubicacion: "la casa del kfecin"
        },
        {
            id_evento: 2,
            titulo: "Ver a mi camarada emma",
            descripcion: "Verlo y que me preste una feria",
            fecha: "2025-11-01",
            hora: "15:30",
            ubicacion: "el tecnologico de toluca que esta en av tecnologico"
        },
        {
            id_evento: 3,
            titulo: "Mi Cumple",
            descripcion: "Regalitos cerrar paseo tollocan",
            fecha: "2025-09-07",
            hora: "19:00",
            ubicacion: "tollocan"
        },
        {
            id_evento: 4,
            titulo: "Estudiar para el examen",
            descripcion: "No procrastinar mas",
            fecha: "2025-10-15",
            hora: "18:00",
            ubicacion: "mi casa"
        },
        {
            id_evento: 5,
            titulo: "Irme a dormir",
            descripcion: "hace sueño",
            fecha: "2025-11-15",
            hora: "18:00",
            ubicacion: "mi cama"
        },


    ]);

    const nuevoEvento: EventoResponse = {
        id_evento: 0,
        titulo: "",
        descripcion: "",
        fecha: "",
        hora: "",
        ubicacion: ""
    };

    return (
        <ImageBackground source={require('../../assets/fondo2.gif')} style={styles.background} resizeMode="cover">
            <View style={styles.overlay} />

            <View style={appTheme.marginGlobal}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={appTheme.title}>Agenda</Text>
                </View>

                <FlatList
                    data={eventos}
                    keyExtractor={(item) => item.id_evento.toString()}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <EventoCard evento={item} />
                    )}
                    ListEmptyComponent={(
                        <View style={appTheme.container}>
                            <Text style={{ fontSize: 16, color: '#b34343ff' }}>
                                No hay eventos programados
                            </Text>
                        </View>
                    )}
                />

                {/* Agregar: ahora se usa la ruta de la pila 'FormEvento' en lugar de la pestaña */}
                {/* Si se necesita un botón para crear, puede agregarse aquí con otro componente */}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
    ,
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.45)'
    }
});