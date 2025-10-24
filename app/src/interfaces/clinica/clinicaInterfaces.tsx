// Interface simple para Historia Clínica
export interface ClinicaMedica {
    id?: number;
    nombre_paciente: string;
    edad: number;
    sexo: string;
    estado_civil?: string;
    ocupacion?: string;
    domicilio?: string;
    telefono: string;
    curp?: string;
    correo_electronico?: string;
    fecha_ingreso?: string;
    diagnostico_inicial?: string;
    alergias?: string;
    enfermedades_previas?: string;
    cirugias_anteriores?: string;
    medicamentos_actuales?: string;
    grupo_sanguineo: string;
    antecedentes_familiares?: string;
    medico_asignado?: string;
    area_internamiento?: string;
    presion_arterial?: string;
    frecuencia_cardiaca?: number;
    temperatura_corporal?: number;
    saturacion_oxigeno?: number;
    peso: number;
    estatura: number;
    notas_evolucion?: string;
    firma_medico?: string;
    fecha_alta?: string;
    // IMÁGENES MÉDICAS REQUERIDAS
    foto_paciente?: string;
    radiografia_torax?: string;
    electrocardiograma?: string;
    analisis_sangre?: string;
    resonancia_magnetica?: string;
    tomografia?: string;
    foto_herida?: string;
    identificacion_oficial?: string;
    resultados_laboratorio?: string;
    radiografia_ultrasonido?: string;
    receta_medica?: string;
    seguro_medico?: string;
}

export interface ClinicaFormData extends ClinicaMedica {}