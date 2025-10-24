import { IsString, IsInt, IsOptional, IsNotEmpty, Min, Max, IsEmail, IsDateString } from 'class-validator';

export class CreateClinicaMedicaDto {
    // DATOS PERSONALES DEL PACIENTE
    @IsNotEmpty()
    @IsString()
    nombre_paciente: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(150)
    edad: number;

    @IsNotEmpty()
    @IsString()
    sexo: string;

    @IsOptional()
    @IsString()
    estado_civil?: string;

    @IsOptional()
    @IsString()
    ocupacion?: string;

    @IsOptional()
    @IsString()
    domicilio?: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsString()
    curp?: string;

    @IsOptional()
    @IsEmail()
    correo_electronico?: string;

    // INFORMACIÓN MÉDICA GENERAL
    @IsOptional()
    @IsDateString()
    fecha_ingreso?: string;

    @IsOptional()
    @IsString()
    diagnostico_inicial?: string;

    @IsOptional()
    @IsString()
    alergias?: string;

    @IsOptional()
    @IsString()
    enfermedades_previas?: string;

    @IsOptional()
    @IsString()
    cirugias_anteriores?: string;

    @IsOptional()
    @IsString()
    medicamentos_actuales?: string;

    @IsNotEmpty()
    @IsString()
    grupo_sanguineo: string;

    @IsOptional()
    @IsString()
    antecedentes_familiares?: string;

    @IsOptional()
    @IsString()
    medico_asignado?: string;

    @IsOptional()
    @IsString()
    area_internamiento?: string;

    // SIGNOS VITALES
    @IsOptional()
    @IsString()
    presion_arterial?: string;

    @IsOptional()
    @IsInt()
    frecuencia_cardiaca?: number;

    @IsOptional()
    temperatura_corporal?: number;

    @IsOptional()
    @IsInt()
    saturacion_oxigeno?: number;

    // DATOS FÍSICOS
    @IsNotEmpty()
    peso: number;

    @IsNotEmpty()
    estatura: number;

    // NOTAS DE SEGUIMIENTO
    @IsOptional()
    @IsString()
    notas_evolucion?: string;

    @IsOptional()
    @IsString()
    firma_medico?: string;

    @IsOptional()
    @IsDateString()
    fecha_alta?: string;

    // IMÁGENES (Base64) - Todas opcionales
    @IsOptional()
    @IsString()
    foto_paciente?: string;

    @IsOptional()
    @IsString()
    radiografia_torax?: string;

    @IsOptional()
    @IsString()
    electrocardiograma?: string;

    @IsOptional()
    @IsString()
    analisis_sangre?: string;

    @IsOptional()
    @IsString()
    resonancia_magnetica?: string;

    @IsOptional()
    @IsString()
    tomografia?: string;

    @IsOptional()
    @IsString()
    foto_herida?: string;

    @IsOptional()
    @IsString()
    identificacion_oficial?: string;

    @IsOptional()
    @IsString()
    resultados_laboratorio?: string;

    @IsOptional()
    @IsString()
    radiografia_ultrasonido?: string;

    @IsOptional()
    @IsString()
    receta_medica?: string;

    @IsOptional()
    @IsString()
    seguro_medico?: string;
}