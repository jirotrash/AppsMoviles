import { useState } from "react";
import { useClinicaApi } from "./useClinicaApi";
import { ClinicaFormData } from "../../interfaces/clinicaInterfaces";

export const useClinicaForm = (initialData?: any) => {
    const { createClinica, updateClinica } = useClinicaApi();

    const [form, setForm] = useState<ClinicaFormData>(initialData || {
        nombre_paciente: "",
        edad: 0,
        sexo: "",
        estado_civil: "",
        ocupacion: "",
        domicilio: "",
        telefono: "",
        grupo_sanguineo: "",
        peso: 0,
        estatura: 0,
        alergias: "",
        enfermedades_previas: "",
        cirugias_anteriores: "",
        medicamentos_actuales: "",
        antecedentes_familiares: "",
        foto_paciente: "",
        identificacion_oficial: "",
        resultados_laboratorio: "",
        radiografia_ultrasonido: "",
        receta_medica: "",
        seguro_medico: ""
    });

    const updateField = (field: keyof ClinicaFormData, value: any) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (isEditing?: boolean, id?: number) => {
        // Validación de campos requeridos
        if (!form.nombre_paciente.trim()) {
            alert('El nombre del paciente es requerido');
            return false;
        }
        
        if (!form.sexo.trim()) {
            alert('El sexo es requerido');
            return false;
        }
        
        if (!form.grupo_sanguineo.trim()) {
            alert('El grupo sanguíneo es requerido');
            return false;
        }

        if (form.edad <= 0) {
            alert('La edad debe ser mayor a 0');
            return false;
        }
        
        if (isEditing) {
            if (!id) {
                alert('Error: ID de paciente no válido para actualización');
                return false;
            }
            return await updateClinica(id, form);
        } else {
            return await createClinica(form);
        }
    };

    const resetForm = () => {
        setForm({
            nombre_paciente: "",
            edad: 0,
            sexo: "",
            estado_civil: "",
            ocupacion: "",
            domicilio: "",
            telefono: "",
            grupo_sanguineo: "",
            peso: 0,
            estatura: 0,
            alergias: "",
            enfermedades_previas: "",
            cirugias_anteriores: "",
            medicamentos_actuales: "",
            antecedentes_familiares: "",
            foto_paciente: "",
            identificacion_oficial: "",
            resultados_laboratorio: "",
            radiografia_ultrasonido: "",
            receta_medica: "",
            seguro_medico: ""
        });
    };

    return {
        form,
        updateField,
        handleSubmit,
        resetForm
    };
};