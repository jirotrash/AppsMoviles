import { useState } from 'react';
import { Alert } from 'react-native';
import { ClinicaFormData } from '../../interfaces/clinicaInterfaces';
import { API_CONFIG } from '../../config/apiConfig';

export const useClinicaApi = () => {
    const [loading, setLoading] = useState(false);

    const createClinica = async (clinica: ClinicaFormData) => {
        setLoading(true);
        try {
            const response = await fetch(API_CONFIG.CLINICA_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clinica),
            });

            if (response.ok) {
                Alert.alert('✅ Éxito', 'Historia clínica creada correctamente');
                return true;
            } else {
                Alert.alert('❌ Error', 'No se pudo crear la historia clínica');
                return false;
            }
        } catch (error) {
            Alert.alert('❌ Error de Conexión', 'No se pudo conectar al servidor');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getClinicas = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_CONFIG.CLINICA_URL);
            
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                Alert.alert('Error', 'Error al cargar historias clínicas');
                return [];
            }
        } catch (error) {
            Alert.alert('Error de Conexión', 'No se pudo conectar al servidor');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const deleteClinica = async (id: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_CONFIG.CLINICA_URL}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Alert.alert('✅ Éxito', 'Historia clínica eliminada correctamente');
                return true;
            } else {
                Alert.alert('❌ Error', 'No se pudo eliminar la historia clínica');
                return false;
            }
        } catch (error) {
            Alert.alert('❌ Error de Conexión', 'No se pudo conectar al servidor');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateClinica = async (id: number, clinica: ClinicaFormData) => {
        setLoading(true);
        try {
            const url = `${API_CONFIG.CLINICA_URL}/${id}`;
            
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clinica),
            });

            if (response.ok) {
                Alert.alert('✅ Éxito', 'Historia clínica actualizada correctamente');
                return true;
            } else {
                const errorText = await response.text();
                Alert.alert('❌ Error', `No se pudo actualizar la historia clínica\nStatus: ${response.status}\nDetalle: ${errorText}`);
                return false;
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            Alert.alert('❌ Error de Conexión', `No se pudo conectar al servidor\nError: ${error}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        createClinica,
        getClinicas,
        deleteClinica,
        updateClinica,
    };
};