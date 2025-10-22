import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Image, Alert } from 'react-native';
import { useClinicaApi } from '../../hooks/clinica/useClinicaApi';
import { ClinicaMedica } from '../../interfaces/clinicaInterfaces';
import { Fab } from '../../components/Fab';

interface Props {
    navigation: any;
}

export const HomeClinica = ({ navigation }: Props) => {
    const [pacientes, setPacientes] = useState<ClinicaMedica[]>([]);
    const { getClinicas, loading } = useClinicaApi();

    useEffect(() => {
        loadPacientes();
    }, []);

    // Agregar navegación listener para recargar cuando regrese de FormClinica
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadPacientes();
        });
        return unsubscribe;
    }, [navigation]);

    const loadPacientes = async () => {
        try {
            const data = await getClinicas();
            setPacientes(data || []);
        } catch (error) {
            setPacientes([]);
        }
    };



    const renderPaciente = ({ item }: { item: ClinicaMedica }) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('DetalleClinica', { paciente: item })}
        >
            <View style={styles.cardHeader}>
                {item.foto_paciente ? (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${item.foto_paciente}` }}
                        style={styles.foto}
                    />
                ) : (
                    <View style={styles.noPhoto}>
                        <Text style={styles.noPhotoText}>👤</Text>
                    </View>
                )}
                <View style={styles.infoContainer}>
                    <Text style={styles.nombre}>{item.nombre_paciente}</Text>
                    <Text style={styles.info}>Edad: {item.edad} años</Text>
                    <Text style={styles.info}>Sexo: {item.sexo}</Text>
                    <Text style={styles.info}>Teléfono: {item.telefono}</Text>
                    <Text style={styles.viewMore}>👁️ Ver más detalles</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historias Clínicas</Text>
            
            <FlatList
                data={pacientes}
                renderItem={renderPaciente}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                style={styles.list}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadPacientes}
                        colors={['#3B82F6']}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No hay historias clínicas registradas</Text>
                        <Text style={styles.emptySubtext}>Presiona el botón + para agregar una nueva</Text>
                    </View>
                }
            />

            <Fab 
                titulo="+"
                position="button_right"
                action={() => navigation.navigate('FormClinica')}
                color="#3B82F6"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#1E40AF',
    },
    list: {
        flex: 1,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#60A5FA',
    },
    cardHeader: {
        flexDirection: 'row',
    },
    foto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    noPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#DBEAFE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#93C5FD',
    },
    noPhotoText: {
        fontSize: 24,
        color: '#3B82F6',
    },
    viewMore: {
        fontSize: 12,
        color: '#3B82F6',
        fontStyle: 'italic',
        marginTop: 5,
    },
    infoContainer: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E40AF',
        marginBottom: 5,
    },
    info: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
});