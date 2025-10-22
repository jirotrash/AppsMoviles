import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ClinicaMedica } from '../../interfaces/clinicaInterfaces';
import { useClinicaApi } from '../../hooks/clinica/useClinicaApi';

interface Props {
    navigation: any;
    route: {
        params: {
            paciente: ClinicaMedica;
        }
    };
}

export const DetalleClinica = ({ navigation, route }: Props) => {
    const initialPaciente = route.params.paciente;
    const [paciente, setPaciente] = useState<ClinicaMedica>(initialPaciente);
    const { deleteClinica, getClinicas } = useClinicaApi();

    // Listener para actualizar datos cuando regrese de FormClinica
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // Recargar los datos del paciente actual
            try {
                const clinicas = await getClinicas();
                const pacienteActualizado = clinicas.find((p: ClinicaMedica) => p.id === initialPaciente.id);
                if (pacienteActualizado) {
                    setPaciente(pacienteActualizado);
                }
            } catch (error) {
                // Error silencioso, mantener datos actuales
            }
        });

        return unsubscribe;
    }, [navigation, initialPaciente.id]);

    const handleEdit = () => {
        navigation.navigate('FormClinica', { paciente, isEditing: true });
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirmar eliminación',
            `¿Estás seguro de que deseas eliminar la historia clínica de ${paciente.nombre_paciente}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Eliminar', 
                    style: 'destructive',
                    onPress: async () => {
                        const success = await deleteClinica(paciente.id);
                        if (success) {
                            navigation.navigate('HomeClinica');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Historia Clínica</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                        <Text style={styles.editButtonText}>✏️ Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.photoSection}>
                    {paciente.foto_paciente ? (
                        <Image 
                            source={{ uri: `data:image/jpeg;base64,${paciente.foto_paciente}` }}
                            style={styles.foto}
                        />
                    ) : (
                        <View style={styles.noPhoto}>
                            <Text style={styles.noPhotoText}>Sin foto</Text>
                        </View>
                    )}
                    <Text style={styles.nombrePaciente}>{paciente.nombre_paciente}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>INFORMACIÓN PERSONAL</Text>
                    <Text style={styles.field}>Edad: {paciente.edad} años</Text>
                    <Text style={styles.field}>Sexo: {paciente.sexo}</Text>
                    <Text style={styles.field}>Estado civil: {paciente.estado_civil || 'No especificado'}</Text>
                    <Text style={styles.field}>Ocupación: {paciente.ocupacion || 'No especificado'}</Text>
                    <Text style={styles.field}>Domicilio: {paciente.domicilio || 'No especificado'}</Text>
                    <Text style={styles.field}>Teléfono: {paciente.telefono || 'No especificado'}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>INFORMACIÓN MÉDICA</Text>
                    <Text style={styles.field}>Grupo sanguíneo: {paciente.grupo_sanguineo}</Text>
                    <Text style={styles.field}>Peso: {paciente.peso} kg</Text>
                    <Text style={styles.field}>Estatura: {paciente.estatura} cm</Text>
                    <Text style={styles.field}>Alergias: {paciente.alergias || 'Ninguna'}</Text>
                    <Text style={styles.field}>Enfermedades previas: {paciente.enfermedades_previas || 'Ninguna'}</Text>
                    <Text style={styles.field}>Cirugías anteriores: {paciente.cirugias_anteriores || 'Ninguna'}</Text>
                    <Text style={styles.field}>Medicamentos actuales: {paciente.medicamentos_actuales || 'Ninguno'}</Text>
                    <Text style={styles.field}>Antecedentes familiares: {paciente.antecedentes_familiares || 'Ninguno'}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>DOCUMENTOS MÉDICOS</Text>
                    
                    {paciente.identificacion_oficial && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Identificación oficial:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.identificacion_oficial}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}

                    {paciente.resultados_laboratorio && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Resultados de laboratorio:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.resultados_laboratorio}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}

                    {paciente.radiografia_ultrasonido && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Radiografía/Ultrasonido:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.radiografia_ultrasonido}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}

                    {paciente.receta_medica && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Receta médica:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.receta_medica}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}

                    {paciente.seguro_medico && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Seguro médico:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.seguro_medico}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    editButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    deleteButton: {
        backgroundColor: '#F44336',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    card: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 12,
        padding: 20,
        elevation: 3,
    },
    photoSection: {
        alignItems: 'center',
        marginBottom: 25,
    },
    foto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    noPhoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    noPhotoText: {
        color: '#666',
        fontSize: 14,
    },
    nombrePaciente: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8B5CF6',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 5,
    },
    field: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        lineHeight: 24,
    },
    imageContainer: {
        marginBottom: 20,
    },
    imageLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 8,
    },
    documentImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        resizeMode: 'cover',
    },
});