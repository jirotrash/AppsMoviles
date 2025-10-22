import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Fab } from '../../components/Fab';
import { useImagenApi } from '../../hooks/useImagenApi';
import { FormImagenData } from '../../hooks/useImagenForm';

interface Props {
    navigation: any;
}

export const HomeImagen = ({ navigation }: Props) => {
    const [imagenes, setImagenes] = useState<FormImagenData[]>([]);
    const { getImagenes, loading } = useImagenApi();

    useEffect(() => {
        loadImagenes();
    }, []);

    // Recargar cuando regresamos a la pantalla
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadImagenes();
        });
        return unsubscribe;
    }, [navigation]);

    const loadImagenes = async () => {
        const data = await getImagenes();
        setImagenes(data);
    };

    const handleImagenPress = (imagen: FormImagenData) => {
        navigation.navigate('ImagenPreview', { imagen });
    };

    // Función para navegar a vista previa de imagen específica
    const handleImagePress = (imagen: FormImagenData, imageField: string) => {
        navigation.navigate('ImagenPreview', { imagen, imageField });
    };

    const renderImagen = ({ item }: { item: FormImagenData }) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => handleImagenPress(item)}
        >
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                <Text style={styles.cardId}>ID: {item.id}</Text>
                
                <View style={styles.imageRow}>
                    {item.imagen1 && (
                        <TouchableOpacity onPress={() => handleImagePress(item, 'imagen1')}>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${item.imagen1}` }}
                                style={styles.miniImage}
                            />
                        </TouchableOpacity>
                    )}
                    {item.imagen2 && (
                        <TouchableOpacity onPress={() => handleImagePress(item, 'imagen2')}>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${item.imagen2}` }}
                                style={styles.miniImage}
                            />
                        </TouchableOpacity>
                    )}
                    {item.imagen3 && (
                        <TouchableOpacity onPress={() => handleImagePress(item, 'imagen3')}>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${item.imagen3}` }}
                                style={styles.miniImage}
                            />
                        </TouchableOpacity>
                    )}
                    {item.imagen4 && (
                        <TouchableOpacity onPress={() => handleImagePress(item, 'imagen4')}>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${item.imagen4}` }}
                                style={styles.miniImage}
                            />
                        </TouchableOpacity>
                    )}
                    {item.imagen5 && (
                        <TouchableOpacity onPress={() => handleImagePress(item, 'imagen5')}>
                            <Image 
                                source={{ uri: `data:image/jpeg;base64,${item.imagen5}` }}
                                style={styles.miniImage}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                
                <Text style={styles.cardSubtext}>
                    Imágenes: {[item.imagen1, item.imagen2, item.imagen3, item.imagen4, item.imagen5].filter(img => img).length}/5
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Imágenes</Text>
            
            {imagenes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No hay imágenes registradas</Text>
                    <Text style={styles.emptySubtext}>Presiona el botón + para agregar una nueva imagen</Text>
                </View>
            ) : (
                <FlatList
                    data={imagenes}
                    renderItem={renderImagen}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <Fab 
                titulo="+"
                position="button_right"
                action={() => navigation.navigate('FormImagen')}
            />
        </View>
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
        marginVertical: 20,
        color: '#333',
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    cardId: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    imageRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    miniImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 5,
        marginBottom: 5,
        resizeMode: 'cover',
    },
    cardSubtext: {
        fontSize: 12,
        color: '#999',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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