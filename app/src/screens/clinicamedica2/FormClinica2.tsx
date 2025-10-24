import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { useClinicaForm2 } from '../../hooks/clinicamedica2/useClinicaForm2';
import { BtnTouch } from '../../components/BtnTouch';
import { useImagePicker } from '../../hooks/useImagePicker';
import { ClinicaFormData } from '../../interfaces/clinicaInterfaces';

interface Props {
    navigation: any;
    route?: any;
}

export const FormClinica2 = ({ navigation, route }: Props) => {
    const paciente = route?.params?.paciente;
    const isEditing = route?.params?.isEditing || false;
    
    const { form, updateField, handleSubmit, resetForm } = useClinicaForm2(paciente);
    const { pickImage } = useImagePicker();

    const onSubmit = async () => {
        const success = await handleSubmit(isEditing, paciente?.id);
        if (success) {
            if (!isEditing) resetForm();
            navigation.goBack();
        }
    };

    const selectImage = async (field: keyof ClinicaFormData) => {
        const imageBase64 = await pickImage();
        if (imageBase64) {
            updateField(field, imageBase64);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                {isEditing ? 'Editar Historia Clínica' : 'Nueva Historia Clínica'}
            </Text>

            <View style={styles.form}>
                {/* SECCIÓN INFORMACIÓN PERSONAL */}
                <Text style={styles.sectionTitle}>INFORMACIÓN PERSONAL</Text>

                <Text style={styles.label}>Nombre del paciente *</Text>
                <TextInput
                    style={styles.input}
                    value={form.nombre_paciente}
                    onChangeText={(text) => updateField('nombre_paciente', text)}
                    placeholder="Nombre completo"
                />

                <View style={styles.row}>
                    <View style={styles.halfInput}>
                        <Text style={styles.label}>Edad *</Text>
                        <TextInput
                            style={styles.input}
                            value={form.edad.toString()}
                            onChangeText={(text) => updateField('edad', parseInt(text) || 0)}
                            placeholder="Edad en años"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.halfInput}>
                        <Text style={styles.label}>Sexo *</Text>
                        <TextInput
                            style={styles.input}
                            value={form.sexo}
                            onChangeText={(text) => updateField('sexo', text)}
                            placeholder="Masculino/Femenino"
                        />
                    </View>
                </View>

                <Text style={styles.label}>Estado civil</Text>
                <TextInput
                    style={styles.input}
                    value={form.estado_civil}
                    onChangeText={(text) => updateField('estado_civil', text)}
                    placeholder="Soltero/a, Casado/a..."
                />

                <Text style={styles.label}>Ocupación</Text>
                <TextInput
                    style={styles.input}
                    value={form.ocupacion}
                    onChangeText={(text) => updateField('ocupacion', text)}
                    placeholder="Trabajo o profesión"
                />

                <Text style={styles.label}>Domicilio</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.domicilio}
                    onChangeText={(text) => updateField('domicilio', text)}
                    placeholder="Dirección completa"
                    multiline
                    numberOfLines={2}
                />

                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                    style={styles.input}
                    value={form.telefono}
                    onChangeText={(text) => updateField('telefono', text)}
                    placeholder="Número de teléfono"
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>CURP</Text>
                <TextInput
                    style={styles.input}
                    value={form.curp || ''}
                    onChangeText={(text) => updateField('curp', text)}
                    placeholder="CURP del paciente"
                />

                <Text style={styles.label}>Correo Electrónico</Text>
                <TextInput
                    style={styles.input}
                    value={form.correo_electronico || ''}
                    onChangeText={(text) => updateField('correo_electronico', text)}
                    placeholder="correo@ejemplo.com"
                    keyboardType="email-address"
                />

                {/* SECCIÓN INFORMACIÓN MÉDICA */}
                <Text style={styles.sectionTitle}>INFORMACIÓN MÉDICA</Text>

                <Text style={styles.label}>Grupo sanguíneo *</Text>
                <TextInput
                    style={styles.input}
                    value={form.grupo_sanguineo}
                    onChangeText={(text) => updateField('grupo_sanguineo', text)}
                    placeholder="A+, B+, O+, AB+, etc."
                />

                <View style={styles.row}>
                    <View style={styles.halfInput}>
                        <Text style={styles.label}>Peso (kg) *</Text>
                        <TextInput
                            style={styles.input}
                            value={form.peso.toString()}
                            onChangeText={(text) => updateField('peso', parseFloat(text) || 0)}
                            placeholder="Peso en kg"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.halfInput}>
                        <Text style={styles.label}>Estatura (cm) *</Text>
                        <TextInput
                            style={styles.input}
                            value={form.estatura.toString()}
                            onChangeText={(text) => updateField('estatura', parseFloat(text) || 0)}
                            placeholder="Estatura en cm"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <Text style={styles.label}>Alergias</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.alergias}
                    onChangeText={(text) => updateField('alergias', text)}
                    placeholder="Alergias conocidas"
                    multiline
                    numberOfLines={2}
                />

                <Text style={styles.label}>Enfermedades previas</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.enfermedades_previas}
                    onChangeText={(text) => updateField('enfermedades_previas', text)}
                    placeholder="Enfermedades anteriores"
                    multiline
                    numberOfLines={2}
                />

                <Text style={styles.label}>Cirugías anteriores</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.cirugias_anteriores}
                    onChangeText={(text) => updateField('cirugias_anteriores', text)}
                    placeholder="Cirugías previas"
                    multiline
                    numberOfLines={2}
                />

                <Text style={styles.label}>Medicamentos actuales</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.medicamentos_actuales}
                    onChangeText={(text) => updateField('medicamentos_actuales', text)}
                    placeholder="Medicamentos que toma"
                    multiline
                    numberOfLines={2}
                />

                <Text style={styles.label}>Antecedentes familiares</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.antecedentes_familiares}
                    onChangeText={(text) => updateField('antecedentes_familiares', text)}
                    placeholder="Enfermedades familiares"
                    multiline
                    numberOfLines={2}
                />

                <Text style={styles.label}>Diagnóstico inicial</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.diagnostico_inicial || ''}
                    onChangeText={(text) => updateField('diagnostico_inicial', text)}
                    placeholder="Diagnóstico inicial"
                    multiline
                    numberOfLines={2}
                />

                <Text style={styles.label}>Médico asignado</Text>
                <TextInput
                    style={styles.input}
                    value={form.medico_asignado || ''}
                    onChangeText={(text) => updateField('medico_asignado', text)}
                    placeholder="Nombre del médico"
                />

                <Text style={styles.label}>Área de internamiento</Text>
                <TextInput
                    style={styles.input}
                    value={form.area_internamiento || ''}
                    onChangeText={(text) => updateField('area_internamiento', text)}
                    placeholder="UCI, Urgencias, etc."
                />

                {/* SECCIÓN SIGNOS VITALES */}
                <Text style={styles.sectionTitle}>SIGNOS VITALES</Text>

                <Text style={styles.label}>Presión arterial</Text>
                <TextInput
                    style={styles.input}
                    value={form.presion_arterial || ''}
                    onChangeText={(text) => updateField('presion_arterial', text)}
                    placeholder="120/80 mmHg"
                />

                <Text style={styles.label}>Frecuencia cardíaca (bpm)</Text>
                <TextInput
                    style={styles.input}
                    value={form.frecuencia_cardiaca?.toString() || ''}
                    onChangeText={(text) => updateField('frecuencia_cardiaca', parseInt(text) || 0)}
                    placeholder="Latidos por minuto"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Temperatura corporal (°C)</Text>
                <TextInput
                    style={styles.input}
                    value={form.temperatura_corporal?.toString() || ''}
                    onChangeText={(text) => updateField('temperatura_corporal', parseFloat(text) || 0)}
                    placeholder="Temperatura en Celsius"
                    keyboardType="decimal-pad"
                />

                <Text style={styles.label}>Saturación de oxígeno (%)</Text>
                <TextInput
                    style={styles.input}
                    value={form.saturacion_oxigeno?.toString() || ''}
                    onChangeText={(text) => updateField('saturacion_oxigeno', parseInt(text) || 0)}
                    placeholder="Saturación SpO2"
                    keyboardType="numeric"
                />

                {/* SECCIÓN FECHAS Y OBSERVACIONES */}
                <Text style={styles.sectionTitle}>FECHAS Y OBSERVACIONES</Text>

                <Text style={styles.label}>Fecha de ingreso</Text>
                <TextInput
                    style={styles.input}
                    value={form.fecha_ingreso || ''}
                    onChangeText={(text) => updateField('fecha_ingreso', text)}
                    placeholder="YYYY-MM-DD HH:MM:SS"
                />

                <Text style={styles.label}>Fecha de alta</Text>
                <TextInput
                    style={styles.input}
                    value={form.fecha_alta || ''}
                    onChangeText={(text) => updateField('fecha_alta', text)}
                    placeholder="YYYY-MM-DD HH:MM:SS"
                />

                <Text style={styles.label}>Notas de evolución</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.notas_evolucion || ''}
                    onChangeText={(text) => updateField('notas_evolucion', text)}
                    placeholder="Observaciones sobre la evolución del paciente"
                    multiline
                    numberOfLines={3}
                />

                {/* SECCIÓN IMÁGENES MÉDICAS */}
                <Text style={styles.sectionTitle}>IMÁGENES REQUERIDAS</Text>

                {/* Foto del paciente */}
                <Text style={styles.label}>Foto del paciente</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('foto_paciente')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Foto</Text>
                </TouchableOpacity>
                {form.foto_paciente && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.foto_paciente}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Radiografía de tórax */}
                <Text style={styles.label}>Radiografía de tórax</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('radiografia_torax')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Radiografía</Text>
                </TouchableOpacity>
                {form.radiografia_torax && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.radiografia_torax}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Electrocardiograma */}
                <Text style={styles.label}>Electrocardiograma</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('electrocardiograma')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar EKG</Text>
                </TouchableOpacity>
                {form.electrocardiograma && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.electrocardiograma}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Análisis de sangre */}
                <Text style={styles.label}>Análisis de sangre</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('analisis_sangre')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Análisis</Text>
                </TouchableOpacity>
                {form.analisis_sangre && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.analisis_sangre}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Resonancia magnética */}
                <Text style={styles.label}>Resonancia magnética</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('resonancia_magnetica')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar RMN</Text>
                </TouchableOpacity>
                {form.resonancia_magnetica && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.resonancia_magnetica}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Tomografía */}
                <Text style={styles.label}>Tomografía</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('tomografia')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Tomografía</Text>
                </TouchableOpacity>
                {form.tomografia && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.tomografia}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Foto de la herida */}
                <Text style={styles.label}>Foto de la herida</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('foto_herida')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Foto</Text>
                </TouchableOpacity>
                {form.foto_herida && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.foto_herida}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Identificación oficial */}
                <Text style={styles.label}>Identificación oficial</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('identificacion_oficial')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar ID</Text>
                </TouchableOpacity>
                {form.identificacion_oficial && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.identificacion_oficial}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Resultados de laboratorio */}
                <Text style={styles.label}>Resultados de laboratorio</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('resultados_laboratorio')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Laboratorio</Text>
                </TouchableOpacity>
                {form.resultados_laboratorio && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.resultados_laboratorio}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Radiografía/Ultrasonido */}
                <Text style={styles.label}>Radiografía o ultrasonido</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('radiografia_ultrasonido')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
                </TouchableOpacity>
                {form.radiografia_ultrasonido && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.radiografia_ultrasonido}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Receta médica */}
                <Text style={styles.label}>Receta médica</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('receta_medica')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Receta</Text>
                </TouchableOpacity>
                {form.receta_medica && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.receta_medica}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Seguro médico */}
                <Text style={styles.label}>Seguro médico</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('seguro_medico')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Seguro</Text>
                </TouchableOpacity>
                {form.seguro_medico && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.seguro_medico}` }}
                        style={styles.imagePreview}
                    />
                )}

                {/* Firma del médico */}
                <Text style={styles.label}>Firma del médico</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('firma_medico')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Firma</Text>
                </TouchableOpacity>
                {form.firma_medico && (
                    <Image 
                        source={{ uri: `data:image/jpeg;base64,${form.firma_medico}` }}
                        style={styles.imagePreview}
                    />
                )}

                <BtnTouch
                    titulo={isEditing ? "Actualizar Historial" : "Guardar Historial"}
                    color="violet"
                    action={onSubmit}
                />

                <BtnTouch
                    titulo="Cancelar"
                    color="gray"
                    action={() => navigation.goBack()}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
        color: '#333',
    },
    form: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 15,
        color: '#8B5CF6',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 15,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        flex: 0.48,
    },
    imageButton: {
        backgroundColor: '#8B5CF6',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 15,
        resizeMode: 'cover',
    },
});
