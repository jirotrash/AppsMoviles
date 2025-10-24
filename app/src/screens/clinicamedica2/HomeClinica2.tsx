import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Image, Alert } from 'react-native';
import { useClinicaApi2 } from '../../hooks/clinicamedica2/useClinicaApi2';
import { ClinicaMedica } from '../../interfaces/clinicaInterfaces';
import { Fab } from '../../components/Fab';

interface Props {
    navigation: any;
}

export const HomeClinica2 = ({ navigation }: Props) => {
    const [pacientes, setPacientes] = useState<ClinicaMedica[]>([]);
    const { getClinicas, deleteClinica, loading } = useClinicaApi2();

    useEffect(() => {
        loadPacientes();
    }, []);

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

    const handleDelete = (id: number, nombre: string) => {
        Alert.alert(
            'Confirmar eliminación',
            `¿Estás seguro de que deseas eliminar la historia clínica de ${nombre}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Eliminar', 
                    style: 'destructive',
                    onPress: async () => {
                        const success = await deleteClinica(id);
                        if (success) {
                            loadPacientes();
                        }
                    }
                }
            ]
        );
    };

    const handleEdit = (item: ClinicaMedica) => {
        navigation.navigate('FormClinica2', { paciente: item, isEditing: true });
    };

    const renderPaciente = ({ item }: { item: ClinicaMedica }) => (
        <View style={styles.card}>
            <TouchableOpacity 
                style={styles.cardHeader}
                onPress={() => navigation.navigate('DetalleClinica2', { paciente: item })}
            >
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
                    <Text style={styles.info}>Teléfono: {item.telefono || 'N/A'}</Text>
                    <Text style={styles.viewMore}>👁️ Ver más detalles</Text>
                </View>
            </TouchableOpacity>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.editButton]}
                    onPress={() => handleEdit(item)}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(item.id!, item.nombre_paciente)}
                >
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clínica Médica 2</Text>
            
            <FlatList
                data={pacientes}
                renderItem={renderPaciente}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                style={styles.list}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadPacientes}
                        colors={['#8B5CF6']}
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
                action={() => navigation.navigate('FormClinica2')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    list: {
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: 15,
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
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    noPhotoText: {
        fontSize: 24,
        color: '#666',
    },
    viewMore: {
        fontSize: 12,
        color: '#8B5CF6',
        fontStyle: 'italic',
        marginTop: 5,
    },
    infoContainer: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    info: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 0.48,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
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
