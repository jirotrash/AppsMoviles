import { useState } from 'react';
import { EventoResponse } from '../interfaces/eventoInterfaces';

export interface FormData {
    id_evento: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    hora: string;
    ubicacion: string;
}

interface UseEventoForm {
    state: FormData;
    handleInputChange: (field: string, value: string | number) => void;
    resetForm: () => void;
}

export const useEventoForm = (): UseEventoForm => {
    const [state, setState] = useState<FormData>({
        id_evento: 0,
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: '',
        ubicacion: ''
    });

    const handleInputChange = (field: string, value: string | number) => {
        setState({
            ...state,
            [field]: value
        });
    };

    const resetForm = () => {
        setState({
            id_evento: 0,
            titulo: '',
            descripcion: '',
            fecha: '',
            hora: '',
            ubicacion: ''
        });
    };

    return {
        state,
        handleInputChange,
        resetForm
    };
};