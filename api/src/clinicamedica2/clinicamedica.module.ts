import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicaMedicaService } from './clinicamedica.service';
import { ClinicaMedicaController } from './clinicamedica.controller';
import { ClinicaMedica } from './entities/clinicamedica.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClinicaMedica], 'clinicamedica2')
    ],
    controllers: [ClinicaMedicaController],
    providers: [ClinicaMedicaService],
    exports: [ClinicaMedicaService]
})
export class ClinicaMedica2Module {}