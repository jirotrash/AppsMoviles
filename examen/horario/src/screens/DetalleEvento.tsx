import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { appTheme } from '../themes/appTheme';
import { BtnTouch } from '../components/BtnTouch';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/EventoNavigator';

interface Props extends StackScreenProps<RootStackParams, "DetalleEvento"> { };

export const DetalleEvento = ({ navigation, route }: Props) => {
    const evento = route.params;

    return (
        <ImageBackground source={require('../../assets/aaae0b97222998328326d6151a1bc198.jpg')} style={styles.bg} resizeMode="cover">
            <View style={styles.overlay} />
            <ScrollView contentContainerStyle={styles.screen}>
                <Text style={styles.pageTitle}>Detalles del Evento</Text>

                <View style={styles.card}>
                <Text style={styles.label}>Título</Text>
                <Text style={styles.valueMain}>{evento.titulo}</Text>

                <Text style={styles.label}>Descripción</Text>
                <Text style={styles.value}>{evento.descripcion || 'Sin descripción'}</Text>

                <View style={styles.row}>
                    <View style={styles.colLeft}>
                        <Text style={styles.label}>Fecha</Text>
                        <Text style={styles.value}>{evento.fecha}</Text>
                    </View>
                    <View style={styles.colRight}>
                        <Text style={styles.label}>Hora</Text>
                        <Text style={styles.value}>{evento.hora}</Text>
                    </View>
                </View>

                <Text style={[styles.label, { marginTop: 12 }]}>Ubicación</Text>
                <Text style={styles.value}>{evento.ubicacion}</Text>

                <View style={styles.actions}>
                        <BtnTouch
                            titulo='Editar Evento'
                            color="rgb(206, 161, 192)"
                            action={() => navigation.navigate('FormEvento', { ...evento })}
                            containerStyle={styles.btnSpacing}
                        />
                    <BtnTouch
                        titulo='<- Volver a la Lista'
                        color='rgb(82, 57, 208)'
                        action={() => navigation.popToTop()}
                        containerStyle={styles.btnSpacing}
                    />
                </View>
            </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 18,
        alignItems: 'center',
        paddingTop: 26,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 12,
        color: '#111',
    },
    card: {
        width: '92%',
        maxWidth: 480,
        backgroundColor: '#d7e0ea',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.14,
        shadowRadius: 18,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(15,34,55,0.06)'
    },
    bg: { flex: 1, width: '100%', height: '100%' },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.18)'
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#233042',
        marginBottom: 6
    },
    valueMain: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0b1220',
        marginBottom: 12
    },
    value: {
        fontSize: 15,
        color: '#2f3b4a',
        lineHeight: 22
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
    colLeft: { flex: 1, marginRight: 8 },
    colRight: { width: 120 },
    actions: { marginTop: 18, width: '100%', alignItems: 'center' },
    btnSpacing: { width: '100%', marginVertical: 8 }
});