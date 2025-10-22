import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { useClinicaForm } from '../../hooks/clinica/useClinicaForm';
import { BtnTouch } from '../../components/BtnTouch';
import { useImagePicker } from '../../hooks/useImagePicker';
import { ClinicaFormData } from '../../interfaces/clinicaInterfaces';

interface Props {
    navigation: any;
    route?: any;
}

export const FormClinica = ({ navigation, route }: Props) => {
    const paciente = route?.params?.paciente;
    const isEditing = route?.params?.isEditing || false;
    
    const { form, updateField, handleSubmit, resetForm } = useClinicaForm(paciente);
    const { pickImage } = useImagePicker();

    const onSubmit = async () => {
        if (isEditing && !paciente?.id) {
            Alert.alert('Error', 'No se puede actualizar: ID de paciente no válido');
            return;
        }
        
        const success = await handleSubmit(isEditing, paciente?.id);
        if (success) {
            if (!isEditing) resetForm();
            navigation.goBack();
        }
    };

    // Función para seleccionar imagen específica
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
                <Text style={styles.label}>Nombre del paciente *</Text>
                <TextInput
                    style={styles.input}
                    value={form.nombre_paciente}
                    onChangeText={(text) => updateField('nombre_paciente', text)}
                    placeholder="Nombre completo"
                />

                <Text style={styles.label}>Edad *</Text>
                <TextInput
                    style={styles.input}
                    value={form.edad.toString()}
                    onChangeText={(text) => updateField('edad', parseInt(text) || 0)}
                    placeholder="Edad en años"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Sexo *</Text>
                <TextInput
                    style={styles.input}
                    value={form.sexo}
                    onChangeText={(text) => updateField('sexo', text)}
                    placeholder="Masculino / Femenino"
                />

                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                    style={styles.input}
                    value={form.telefono}
                    onChangeText={(text) => updateField('telefono', text)}
                    placeholder="Número de teléfono"
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Grupo sanguíneo *</Text>
                <TextInput
                    style={styles.input}
                    value={form.grupo_sanguineo}
                    onChangeText={(text) => updateField('grupo_sanguineo', text)}
                    placeholder="A+, B+, O+, AB+, etc."
                />

                <Text style={styles.label}>Peso (kg)</Text>
                <TextInput
                    style={styles.input}
                    value={form.peso.toString()}
                    onChangeText={(text) => updateField('peso', parseFloat(text) || 0)}
                    placeholder="Peso en kilogramos"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Estatura (cm)</Text>
                <TextInput
                    style={styles.input}
                    value={form.estatura.toString()}
                    onChangeText={(text) => updateField('estatura', parseFloat(text) || 0)}
                    placeholder="Estatura en centímetros"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Estado civil</Text>
                <TextInput
                    style={styles.input}
                    value={form.estado_civil}
                    onChangeText={(text) => updateField('estado_civil', text)}
                    placeholder="Soltero/a, Casado/a, Divorciado/a, etc."
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

                <Text style={styles.label}>Alergias</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.alergias}
                    onChangeText={(text) => updateField('alergias', text)}
                    placeholder="Alergias conocidas"
                    multiline
                    numberOfLines={3}
                />

                <Text style={styles.label}>Enfermedades previas</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.enfermedades_previas}
                    onChangeText={(text) => updateField('enfermedades_previas', text)}
                    placeholder="Enfermedades anteriores"
                    multiline
                    numberOfLines={3}
                />

                <Text style={styles.label}>Cirugías anteriores</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.cirugias_anteriores}
                    onChangeText={(text) => updateField('cirugias_anteriores', text)}
                    placeholder="Cirugías previas"
                    multiline
                    numberOfLines={3}
                />

                <Text style={styles.label}>Medicamentos actuales</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.medicamentos_actuales}
                    onChangeText={(text) => updateField('medicamentos_actuales', text)}
                    placeholder="Medicamentos que toma actualmente"
                    multiline
                    numberOfLines={3}
                />

                <Text style={styles.label}>Antecedentes familiares</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.antecedentes_familiares}
                    onChangeText={(text) => updateField('antecedentes_familiares', text)}
                    placeholder="Enfermedades familiares relevantes"
                    multiline
                    numberOfLines={3}
                />

                {/* SECCIÓN DE DOCUMENTOS MÉDICOS */}
                <Text style={styles.sectionTitle}>DOCUMENTOS:</Text>

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

                {/* Radiografía o ultrasonido */}
                <Text style={styles.label}>Radiografía o ultrasonido</Text>
                <TouchableOpacity 
                    style={styles.imageButton}
                    onPress={() => selectImage('radiografia_ultrasonido')}
                >
                    <Text style={styles.imageButtonText}>Seleccionar Radiografía</Text>
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

                <BtnTouch
                    titulo={isEditing ? "Actualizar Historia" : "Guardar Historia"}
                    color="blue"
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
        backgroundColor: '#F0F8FF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
        color: '#1E40AF',
    },
    form: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 15,
        color: '#1E40AF',
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#3B82F6',
        paddingBottom: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#1E40AF',
    },
    input: {
        borderWidth: 2,
        borderColor: '#93C5FD',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        fontSize: 16,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    imageButton: {
        backgroundColor: '#3B82F6',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: '#93C5FD',
    },
});