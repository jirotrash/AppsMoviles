import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfilCompletoDto } from './create-perfilcompleto.dto';

export class UpdatePerfilCompletoDto extends PartialType(CreatePerfilCompletoDto) {}