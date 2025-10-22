import { 
    IsString,
    MaxLength,
    MinLength,
    IsOptional
} from "class-validator";

export class UpdateMisImagenDto {
    @IsString()
    @MaxLength(255)
    @MinLength(1)
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    imagen1?: string;

    @IsString()
    @IsOptional()
    imagen2?: string;

    @IsString()
    @IsOptional()
    imagen3?: string;

    @IsString()
    @IsOptional()
    imagen4?: string;

    @IsString()
    @IsOptional()
    imagen5?: string;
}