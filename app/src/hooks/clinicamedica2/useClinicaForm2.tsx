import { useState } from "react";
import { useClinicaApi2 } from "./useClinicaApi2";
import { ClinicaFormData } from "../../interfaces/clinicaInterfaces";

export const useClinicaForm2 = (initialData?: any) => {
    const { createClinica, updateClinica } = useClinicaApi2();

    const [form, setForm] = useState<ClinicaFormData>(initialData || {
        nombre_paciente: "",
        edad: 0,
        sexo: "",
        estado_civil: "",
        ocupacion: "",
        domicilio: "",
        telefono: "",
        curp: "",
        correo_electronico: "",
        grupo_sanguineo: "",
        peso: 0,
        estatura: 0,
        alergias: "",
        enfermedades_previas: "",
        cirugias_anteriores: "",
        medicamentos_actuales: "",
        antecedentes_familiares: "",
        diagnostico_inicial: "",
        medico_asignado: "",
        area_internamiento: "",
        presion_arterial: "",
        frecuencia_cardiaca: 0,
        temperatura_corporal: 0,
        saturacion_oxigeno: 0,
        fecha_ingreso: "",
        fecha_alta: "",
        notas_evolucion: "",
        foto_paciente: "",
        radiografia_torax: "",
        electrocardiograma: "",
        analisis_sangre: "",
        resonancia_magnetica: "",
        tomografia: "",
        foto_herida: "",
        identificacion_oficial: "",
        resultados_laboratorio: "",
        radiografia_ultrasonido: "",
        receta_medica: "",
        seguro_medico: "",
        firma_medico: ""
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
        
        if (isEditing && id) {
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
            curp: "",
            correo_electronico: "",
            grupo_sanguineo: "",
            peso: 0,
            estatura: 0,
            alergias: "",
            enfermedades_previas: "",
            cirugias_anteriores: "",
            medicamentos_actuales: "",
            antecedentes_familiares: "",
            diagnostico_inicial: "",
            medico_asignado: "",
            area_internamiento: "",
            presion_arterial: "",
            frecuencia_cardiaca: 0,
            temperatura_corporal: 0,
            saturacion_oxigeno: 0,
            fecha_ingreso: "",
            fecha_alta: "",
            notas_evolucion: "",
            foto_paciente: "",
            radiografia_torax: "",
            electrocardiograma: "",
            analisis_sangre: "",
            resonancia_magnetica: "",
            tomografia: "",
            foto_herida: "",
            identificacion_oficial: "",
            resultados_laboratorio: "",
            radiografia_ultrasonido: "",
            receta_medica: "",
            seguro_medico: "",
            firma_medico: ""
        });
    };

    return {
        form,
        updateField,
        handleSubmit,
        resetForm
    };
};
