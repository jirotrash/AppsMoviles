import { IsString, IsInt, IsOptional, IsDecimal, IsNotEmpty, Min, Max } from 'class-validator';

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

    @IsNotEmpty()
    @IsString()
    estado_civil: string;

    @IsNotEmpty()
    @IsString()
    ocupacion: string;

    @IsNotEmpty()
    @IsString()
    domicilio: string;

    @IsNotEmpty()
    @IsString()
    telefono: string;

    // INFORMACIÓN MÉDICA
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

    // DATOS FÍSICOS
    @IsNotEmpty()
    peso: number;

    @IsNotEmpty()
    estatura: number;

    // IMÁGENES (Base64) - Todas opcionales
    @IsOptional()
    @IsString()
    foto_paciente?: string;

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