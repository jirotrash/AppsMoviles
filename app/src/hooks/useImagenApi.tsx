import { useState } from 'react';
import { Alert } from 'react-native';
import { FormImagenData } from './useImagenForm';
import { API_CONFIG } from '../config/apiConfig';

export const useImagenApi = () => {
    const [loading, setLoading] = useState(false);

    const createImagen = async (imagen: FormImagenData) => {
        setLoading(true);
        try {
            const response = await fetch(API_CONFIG.IMAGENES_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(imagen),
            });

            if (response.ok) {
                Alert.alert('Éxito', 'Imagen creada correctamente');
            } else {
                Alert.alert('Error', 'No se pudo crear la imagen');
            }
        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const updateImagen = async (imagen: FormImagenData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_CONFIG.IMAGENES_URL}/${imagen.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(imagen),
            });

            if (response.ok) {
                Alert.alert('Éxito', 'Imagen actualizada correctamente');
            } else {
                Alert.alert('Error', 'No se pudo actualizar la imagen');
            }
        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const deleteImagen = async (imagen: FormImagenData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_CONFIG.IMAGENES_URL}/${imagen.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Alert.alert('Éxito', 'Imagen eliminada correctamente');
            } else {
                Alert.alert('Error', 'No se pudo eliminar la imagen');
            }
        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const getImagenes = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_CONFIG.IMAGENES_URL);
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            Alert.alert('Error', 'Error al cargar las imágenes');
        } finally {
            setLoading(false);
        }
        return [];
    };

    return {
        loading,
        createImagen,
        updateImagen,
        deleteImagen,
        getImagenes,
    };
};