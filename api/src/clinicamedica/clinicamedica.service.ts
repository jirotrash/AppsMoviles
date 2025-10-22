import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicaMedica } from './entities/clinicamedica.entity';
import { CreateClinicaMedicaDto } from './dto/create-clinicamedica.dto';
import { UpdateClinicaMedicaDto } from './dto/update-clinicamedica.dto';

@Injectable()
export class ClinicaMedicaService {
    constructor(
        @InjectRepository(ClinicaMedica, 'clinicamedica')
        private readonly clinicaMedicaRepository: Repository<ClinicaMedica>,
    ) {}

    // 📋 CREAR NUEVA HISTORIA CLÍNICA
    async create(createClinicaMedicaDto: CreateClinicaMedicaDto): Promise<ClinicaMedica> {
        const nuevaHistoria = this.clinicaMedicaRepository.create(createClinicaMedicaDto);
        return await this.clinicaMedicaRepository.save(nuevaHistoria);
    }

    // 📋 OBTENER TODAS LAS HISTORIAS CLÍNICAS
    async findAll(): Promise<ClinicaMedica[]> {
        return await this.clinicaMedicaRepository.find({
            order: { fecha_creacion: 'DESC' }
        });
    }

    // 📋 OBTENER UNA HISTORIA CLÍNICA POR ID
    async findOne(id: number): Promise<ClinicaMedica> {
        const historia = await this.clinicaMedicaRepository.findOne({
            where: { id }
        });

        if (!historia) {
            throw new NotFoundException(`Historia clínica con ID ${id} no encontrada`);
        }

        return historia;
    }

    // 📋 BUSCAR POR NOMBRE DE PACIENTE
    async findByPatientName(nombre: string): Promise<ClinicaMedica[]> {
        return await this.clinicaMedicaRepository.find({
            where: {
                nombre_paciente: nombre
            },
            order: { fecha_creacion: 'DESC' }
        });
    }

    // 📋 ACTUALIZAR HISTORIA CLÍNICA
    async update(id: number, updateClinicaMedicaDto: UpdateClinicaMedicaDto): Promise<ClinicaMedica> {
        const historia = await this.findOne(id);
        
        // Actualizar campos
        Object.assign(historia, updateClinicaMedicaDto);
        
        return await this.clinicaMedicaRepository.save(historia);
    }

    // 📋 ELIMINAR HISTORIA CLÍNICA
    async remove(id: number): Promise<{ message: string }> {
        const historia = await this.findOne(id);
        await this.clinicaMedicaRepository.remove(historia);
        
        return { message: `Historia clínica del paciente eliminada correctamente` };
    }

    // 📊 OBTENER ESTADÍSTICAS BÁSICAS
    async getStats(): Promise<any> {
        const total = await this.clinicaMedicaRepository.count();
        const porSexo = await this.clinicaMedicaRepository
            .createQueryBuilder('clinica')
            .select('clinica.sexo, COUNT(*) as cantidad')
            .groupBy('clinica.sexo')
            .getRawMany();

        const porGrupoSanguineo = await this.clinicaMedicaRepository
            .createQueryBuilder('clinica')
            .select('clinica.grupo_sanguineo, COUNT(*) as cantidad')
            .groupBy('clinica.grupo_sanguineo')
            .getRawMany();

        return {
            total_pacientes: total,
            distribucion_por_sexo: porSexo,
            distribucion_por_grupo_sanguineo: porGrupoSanguineo
        };
    }
}