import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicaMedicaDto } from './create-clinicamedica.dto';

export class UpdateClinicaMedicaDto extends PartialType(CreateClinicaMedicaDto) {}