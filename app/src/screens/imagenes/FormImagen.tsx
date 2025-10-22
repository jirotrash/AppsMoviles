import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { BtnTouch } from '../../components/BtnTouch';
import { useImagenForm } from '../../hooks/useImagenForm';
import * as ImagePicker from 'expo-image-picker';

interface Props {
    navigation: any;
    route: any;
}

export const FormImagen = ({ navigation, route }: Props) => {
    const { state, handleInputChange, handleSubmit, handleDelete } = useImagenForm();

    useEffect(() => {
        // Si recibimos una imagen por parámetro (edición)
        if (route.params?.imagen) {
            const { imagen } = route.params;
            handleInputChange('id', imagen.id);
            handleInputChange('nombre', imagen.nombre);
            handleInputChange('imagen1', imagen.imagen1 || '');
            handleInputChange('imagen2', imagen.imagen2 || '');
            handleInputChange('imagen3', imagen.imagen3 || '');
            handleInputChange('imagen4', imagen.imagen4 || '');
            handleInputChange('imagen5', imagen.imagen5 || '');
        }
    }, [route.params]);

    const pickImage = async (field: 'imagen1' | 'imagen2' | 'imagen3' | 'imagen4' | 'imagen5') => {
        // Solicitar permisos
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
            Alert.alert('Permisos', 'Se necesitan permisos para acceder a la galería');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            const base64Image = result.assets[0].base64;
            handleInputChange(field, base64Image);
        }
    };

    const onSubmit = async () => {
        if (!state.nombre.trim()) {
            Alert.alert('Error', 'El nombre es requerido');
            return;
        }
        
        await handleSubmit();
        navigation.goBack();
    };

    const onDelete = async () => {
        Alert.alert(
            'Confirmar',
            '¿Está seguro de eliminar esta imagen?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Eliminar', 
                    style: 'destructive',
                    onPress: async () => {
                        await handleDelete();
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>
                    {state.id === 0 ? 'Nueva Imagen' : 'Editar Imagen'}
                </Text>

                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    value={state.nombre}
                    onChangeText={(text) => handleInputChange('nombre', text)}
                    placeholder="Ingrese el nombre"
                />

                {/* Imagen 1 */}
                <Text style={styles.label}>Imagen 1:</Text>
                <TouchableOpacity 
                    style={styles.imageContainer}
                    onPress={() => pickImage('imagen1')}
                >
                    {state.imagen1 ? (
                        <Image 
                            source={{ uri: `data:image/jpeg;base64,${state.imagen1}` }}
                            style={styles.imagePreview}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderText}>Seleccionar Imagen 1</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Imagen 2 */}
                <Text style={styles.label}>Imagen 2:</Text>
                <TouchableOpacity 
                    style={styles.imageContainer}
                    onPress={() => pickImage('imagen2')}
                >
                    {state.imagen2 ? (
                        <Image 
                            source={{ uri: `data:image/jpeg;base64,${state.imagen2}` }}
                            style={styles.imagePreview}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderText}>Seleccionar Imagen 2</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Imagen 3 */}
                <Text style={styles.label}>Imagen 3:</Text>
                <TouchableOpacity 
                    style={styles.imageContainer}
                    onPress={() => pickImage('imagen3')}
                >
                    {state.imagen3 ? (
                        <Image 
                            source={{ uri: `data:image/jpeg;base64,${state.imagen3}` }}
                            style={styles.imagePreview}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderText}>Seleccionar Imagen 3</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Imagen 4 */}
                <Text style={styles.label}>Imagen 4:</Text>
                <TouchableOpacity 
                    style={styles.imageContainer}
                    onPress={() => pickImage('imagen4')}
                >
                    {state.imagen4 ? (
                        <Image 
                            source={{ uri: `data:image/jpeg;base64,${state.imagen4}` }}
                            style={styles.imagePreview}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderText}>Seleccionar Imagen 4</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Imagen 5 */}
                <Text style={styles.label}>Imagen 5:</Text>
                <TouchableOpacity 
                    style={styles.imageContainer}
                    onPress={() => pickImage('imagen5')}
                >
                    {state.imagen5 ? (
                        <Image 
                            source={{ uri: `data:image/jpeg;base64,${state.imagen5}` }}
                            style={styles.imagePreview}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderText}>Seleccionar Imagen 5</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <BtnTouch 
                    titulo={state.id === 0 ? 'Crear' : 'Actualizar'}
                    color="violet"
                    action={onSubmit}
                />

                {state.id !== 0 && (
                    <BtnTouch 
                        titulo="Eliminar"
                        color="red"
                        action={onDelete}
                    />
                )}

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
    form: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
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
    imageContainer: {
        marginBottom: 15,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'dashed',
    },
    placeholderText: {
        color: '#666',
        fontSize: 16,
    },
});