import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MisImagen } from './entities/misimagen.entity';
import { CreateMisImagenDto } from './dto/create-misimagen.dto';
import { UpdateMisImagenDto } from './dto/update-misimagen.dto';

@Injectable()
export class MisImagenesService {
    constructor(
        @InjectRepository(MisImagen, 'lasimagenes')
        private misImagenRepository: Repository<MisImagen>
    ) {}

    async create(createMisImagenDto: CreateMisImagenDto): Promise<MisImagen> {
        const nuevaImagen = this.misImagenRepository.create(createMisImagenDto);
        return await this.misImagenRepository.save(nuevaImagen);
    }

    async findAll(): Promise<MisImagen[]> {
        return await this.misImagenRepository.find();
    }

    async findOne(id: number): Promise<MisImagen> {
        return await this.misImagenRepository.findOneBy({ id });
    }

    async update(id: number, updateMisImagenDto: UpdateMisImagenDto): Promise<MisImagen> {
        await this.misImagenRepository.update(id, updateMisImagenDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.misImagenRepository.delete(id);
    }

    // Método para obtener todas las imágenes de un registro específico
    async getImagenes(id: number): Promise<string[]> {
        const registro = await this.findOne(id);
        if (!registro) return [];
        
        return [
            registro.imagen1,
            registro.imagen2,
            registro.imagen3,
            registro.imagen4,
            registro.imagen5
        ].filter(imagen => imagen !== null && imagen !== '');
    }
}