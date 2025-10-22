import { IsString, IsEmail, IsOptional, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePerfilCompletoDto {
    // CAMPOS REQUERIDOS
    @IsNotEmpty({ message: 'El nombre completo es requerido' })
    @IsString({ message: 'El nombre completo debe ser un texto' })
    nombre_completo: string;

    @IsNotEmpty({ message: 'El usuario es requerido' })
    @IsString({ message: 'El usuario debe ser un texto' })
    usuario: string;

    @IsNotEmpty({ message: 'El correo es requerido' })
    @IsEmail({}, { message: 'Debe ser un correo válido' })
    correo: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    contrasena: string;

    @IsNotEmpty({ message: 'El teléfono es requerido' })
    @IsString({ message: 'El teléfono debe ser un texto' })
    telefono: string;

    // CAMPOS OPCIONALES
    @IsOptional()
    @IsString({ message: 'La ocupación debe ser un texto' })
    ocupacion?: string;

    @IsOptional()
    @IsString({ message: 'El país debe ser un texto' })
    pais?: string;

    @IsOptional()
    @IsString({ message: 'Los idiomas deben ser un texto' })
    idiomas?: string;

    @IsOptional()
    @IsString({ message: 'Las habilidades deben ser un texto' })
    habilidades?: string;

    @IsOptional()
    @IsString({ message: 'La descripción personal debe ser un texto' })
    descripcion_personal?: string;

    @IsOptional()
    @IsString({ message: 'Las redes sociales deben ser un texto' })
    redes_sociales?: string;

    @IsOptional()
    @IsString({ message: 'La experiencia debe ser un texto' })
    experiencia?: string;

    @IsOptional()
    @IsString({ message: 'El portafolio web debe ser un texto' })
    portafolio_web?: string;

    @IsOptional()
    @IsString({ message: 'La preferencia de notificaciones debe ser un texto' })
    preferencia_notificaciones?: string;

    @IsOptional()
    @IsString({ message: 'El tipo de cuenta debe ser un texto' })
    tipo_cuenta?: string;

    // IMÁGENES
    @IsOptional()
    @IsString({ message: 'La foto de perfil debe ser un texto' })
    foto_perfil?: string;

    @IsOptional()
    @IsString({ message: 'La imagen de portada debe ser un texto' })
    imagen_portada?: string;

    @IsOptional()
    @IsString({ message: 'El certificado debe ser un texto' })
    certificado?: string;

    @IsOptional()
    @IsString({ message: 'El comprobante de identidad debe ser un texto' })
    comprobante_identidad?: string;

    @IsOptional()
    @IsString({ message: 'El portafolio visual debe ser un texto' })
    portafolio_visual?: string;
}