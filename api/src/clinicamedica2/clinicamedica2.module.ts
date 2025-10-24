import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicaMedica2Service } from './clinicamedica2.service';
import { ClinicaMedica2Controller } from './clinicamedica2.controller';
import { ClinicaMedica } from './entities/clinicamedica.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClinicaMedica], 'clinicamedica2')
    ],
    controllers: [ClinicaMedica2Controller],
    providers: [ClinicaMedica2Service],
    exports: [ClinicaMedica2Service]
})
export class ClinicaMedica2Module {}
