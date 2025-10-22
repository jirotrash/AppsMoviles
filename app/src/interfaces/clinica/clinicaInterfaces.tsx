// Interface simple para Historia Clínica
export interface ClinicaMedica {
    id?: number;
    nombre_paciente: string;
    edad: number;
    sexo: string;
    telefono: string;
    grupo_sanguineo: string;
    peso: number;
    estatura: number;
    alergias?: string;
    medicamentos_actuales?: string;
    // IMÁGENES MÉDICAS REQUERIDAS
    foto_paciente?: string;
    identificacion_oficial?: string;
    resultados_laboratorio?: string;
    radiografia_ultrasonido?: string;
    receta_medica?: string;
    seguro_medico?: string;
}

export interface ClinicaFormData extends ClinicaMedica {}