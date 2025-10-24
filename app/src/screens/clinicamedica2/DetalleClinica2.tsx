import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ClinicaMedica } from '../../interfaces/clinicaInterfaces';

interface Props {
    navigation: any;
    route: {
        params: {
            paciente: ClinicaMedica;
        }
    };
}

export const DetalleClinica2 = ({ navigation, route }: Props) => {
    const { paciente } = route.params;

    const handleEdit = () => {
        navigation.navigate('FormClinica2', { paciente, isEditing: true });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Historia Clínica</Text>
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Text style={styles.editButtonText}>✏️ Editar</Text>
                </TouchableOpacity>
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
                    <Text style={styles.field}>CURP: {paciente.curp || 'No especificado'}</Text>
                    <Text style={styles.field}>Correo: {paciente.correo_electronico || 'No especificado'}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>INFORMACIÓN MÉDICA</Text>
                    <Text style={styles.field}>Grupo sanguíneo: {paciente.grupo_sanguineo}</Text>
                    <Text style={styles.field}>Peso: {paciente.peso} kg</Text>
                    <Text style={styles.field}>Estatura: {paciente.estatura} cm</Text>
                    <Text style={styles.field}>Alergias: {paciente.alergias || 'Ninguna'}</Text>
                    <Text style={styles.field}>Enfermedades previas: {paciente.enfermedades_previas || 'Ninguna'}</Text>
                    <Text style={styles.field}>Cirugías anteriores: {paciente.cirugias_anteriores || 'Ninguna'}</Text>
                    <Text style={styles.field}>Medicamentos: {paciente.medicamentos_actuales || 'Ninguno'}</Text>
                    <Text style={styles.field}>Antecedentes familiares: {paciente.antecedentes_familiares || 'Ninguno'}</Text>
                    <Text style={styles.field}>Diagnóstico: {paciente.diagnostico_inicial || 'No especificado'}</Text>
                    <Text style={styles.field}>Médico: {paciente.medico_asignado || 'No asignado'}</Text>
                    <Text style={styles.field}>Área: {paciente.area_internamiento || 'No especificada'}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>SIGNOS VITALES</Text>
                    <Text style={styles.field}>Presión arterial: {paciente.presion_arterial || 'N/A'}</Text>
                    <Text style={styles.field}>Frecuencia cardíaca: {paciente.frecuencia_cardiaca || 'N/A'} bpm</Text>
                    <Text style={styles.field}>Temperatura: {paciente.temperatura_corporal || 'N/A'}°C</Text>
                    <Text style={styles.field}>Saturación O₂: {paciente.saturacion_oxigeno || 'N/A'}%</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>FECHAS Y OBSERVACIONES</Text>
                    <Text style={styles.field}>Fecha de ingreso: {paciente.fecha_ingreso || 'No especificado'}</Text>
                    <Text style={styles.field}>Fecha de alta: {paciente.fecha_alta || 'No especificado'}</Text>
                    <Text style={[styles.field, styles.observationField]}>Notas de evolución: {paciente.notas_evolucion || 'Sin notas'}</Text>
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

                    {paciente.radiografia_torax && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Radiografía de tórax:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.radiografia_torax}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}

                    {paciente.electrocardiograma && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Electrocardiograma:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.electrocardiograma}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}

                    {paciente.analisis_sangre && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Análisis de sangre:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.analisis_sangre}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}

                    {paciente.resonancia_magnetica && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Resonancia magnética:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.resonancia_magnetica}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}

                    {paciente.tomografia && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Tomografía:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.tomografia}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}

                    {paciente.foto_herida && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Foto de la herida:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.foto_herida}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}

                    {paciente.firma_medico && (
                        <View style={styles.imageContainer}>
                            <Text style={styles.imageLabel}>Firma del médico:</Text>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${paciente.firma_medico}` }}
                                style={styles.documentImage}
                            />
                        </View>
                    )}
                </View>

                {paciente.notas_evolucion && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>NOTAS DE EVOLUCIÓN</Text>
                        <Text style={styles.field}>{paciente.notas_evolucion}</Text>
                    </View>
                )}
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
    editButton: {
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
    observationField: {
        backgroundColor: '#f9f5ff',
        padding: 10,
        borderRadius: 5,
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
