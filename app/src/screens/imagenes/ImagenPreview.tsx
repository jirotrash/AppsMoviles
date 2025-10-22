import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

interface Props {
    navigation: any;
    route: any;
}

export const ImagenPreview = ({ navigation, route }: Props) => {
    const { imagen, imageField } = route.params; // imagen completa y campo específico

    // Obtener la imagen específica o la primera disponible
    const getImageToShow = () => {
        if (imageField && imagen[imageField]) {
            return imagen[imageField];
        }
        // Si no se especifica campo, mostrar la primera disponible
        return imagen.imagen1 || imagen.imagen2 || imagen.imagen3 || imagen.imagen4 || imagen.imagen5 || null;
    };

    const currentImage = getImageToShow();

    const handleModify = () => {
        navigation.navigate('FormImagen', { imagen });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    if (!currentImage) {
        return (
            <View style={styles.container}>
                <Text style={styles.noImageText}>No hay imagen para mostrar</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.backButton]}
                        onPress={handleBack}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Regresar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            
            {/* Imagen en tamaño completo */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: `data:image/jpeg;base64,${currentImage}` }}
                    style={styles.fullImage}
                    resizeMode="contain"
                />
            </View>

            {/* Información de la imagen */}
            <View style={styles.infoContainer}>
                <Text style={styles.imageName}>{imagen.nombre}</Text>
                <Text style={styles.imageId}>ID: {imagen.id}</Text>
                {imageField && (
                    <Text style={styles.imageField}>
                        {imageField.replace('imagen', 'Imagen ')}
                    </Text>
                )}
            </View>

            {/* Botones de acción */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.modifyButton]}
                    onPress={handleModify}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Modificar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={[styles.actionButton, styles.backButton]}
                    onPress={handleBack}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Regresar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    fullImage: {
        width: '100%',
        height: '100%',
        maxHeight: '80%',
    },
    infoContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 15,
        alignItems: 'center',
    },
    imageName: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    imageId: {
        color: '#CCCCCC',
        fontSize: 14,
        textAlign: 'center',
    },
    imageField: {
        color: '#8B5CF6',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
    buttonContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 20,
        paddingBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modifyButton: {
        backgroundColor: '#8B5CF6',
        marginRight: 8,
    },
    backButton: {
        backgroundColor: '#6B7280',
        marginLeft: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noImageText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 100,
        marginBottom: 50,
    },
});