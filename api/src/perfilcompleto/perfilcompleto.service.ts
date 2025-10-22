import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreatePerfilCompletoDto } from './dto/create-perfilcompleto.dto';
import { UpdatePerfilCompletoDto } from './dto/update-perfilcompleto.dto';
import { PerfilCompleto } from './entities/perfilcompleto.entity';

@Injectable()
export class PerfilCompletoService {
  constructor(
    @InjectRepository(PerfilCompleto, 'perfilcompleto')
    private perfilCompletoRepository: Repository<PerfilCompleto>,
  ) {}

  async create(createPerfilCompletoDto: CreatePerfilCompletoDto): Promise<PerfilCompleto> {
    try {
      // Verificar si ya existe el usuario o correo
      const existingUser = await this.perfilCompletoRepository.findOne({
        where: [
          { usuario: createPerfilCompletoDto.usuario },
          { correo: createPerfilCompletoDto.correo }
        ]
      });

      if (existingUser) {
        throw new ConflictException('El usuario o correo ya existe');
      }

      const perfilCompleto = this.perfilCompletoRepository.create(createPerfilCompletoDto);
      return await this.perfilCompletoRepository.save(perfilCompleto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Error al crear el perfil completo: ' + error.message);
    }
  }

  async findAll(): Promise<PerfilCompleto[]> {
    try {
      return await this.perfilCompletoRepository.find({
        order: { created_at: 'DESC' }
      });
    } catch (error) {
      throw new NotFoundException('Error al obtener los perfiles completos: ' + error.message);
    }
  }

  async findOne(id: number): Promise<PerfilCompleto> {
    try {
      const perfilCompleto = await this.perfilCompletoRepository.findOne({
        where: { id }
      });

      if (!perfilCompleto) {
        throw new NotFoundException(`Perfil completo con ID ${id} no encontrado`);
      }

      return perfilCompleto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Error al obtener el perfil completo: ' + error.message);
    }
  }

  async findByUsername(usuario: string): Promise<PerfilCompleto> {
    try {
      const perfilCompleto = await this.perfilCompletoRepository.findOne({
        where: { usuario }
      });

      if (!perfilCompleto) {
        throw new NotFoundException(`Perfil completo con usuario ${usuario} no encontrado`);
      }

      return perfilCompleto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Error al obtener el perfil completo: ' + error.message);
    }
  }

  async update(id: number, updatePerfilCompletoDto: UpdatePerfilCompletoDto): Promise<PerfilCompleto> {
    try {
      const perfilCompleto = await this.findOne(id);

      // Verificar duplicados si se está actualizando usuario o correo
      if (updatePerfilCompletoDto.usuario || updatePerfilCompletoDto.correo) {
        const existingUser = await this.perfilCompletoRepository.findOne({
          where: [
            { usuario: updatePerfilCompletoDto.usuario },
            { correo: updatePerfilCompletoDto.correo }
          ]
        });

        if (existingUser && existingUser.id !== id) {
          throw new ConflictException('El usuario o correo ya existe');
        }
      }

      Object.assign(perfilCompleto, updatePerfilCompletoDto);
      return await this.perfilCompletoRepository.save(perfilCompleto);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Error al actualizar el perfil completo: ' + error.message);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const perfilCompleto = await this.findOne(id);
      await this.perfilCompletoRepository.remove(perfilCompleto);
      return { message: `Perfil completo con ID ${id} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Error al eliminar el perfil completo: ' + error.message);
    }
  }

  async getStats(): Promise<any> {
    try {
      const total = await this.perfilCompletoRepository.count();
      const conFoto = await this.perfilCompletoRepository.count({
        where: { foto_perfil: Not(null) }
      });
      const conCertificado = await this.perfilCompletoRepository.count({
        where: { certificado: Not(null) }
      });

      return {
        total,
        conFoto,
        conCertificado,
        porcentajeFoto: total > 0 ? ((conFoto / total) * 100).toFixed(2) : 0,
        porcentajeCertificado: total > 0 ? ((conCertificado / total) * 100).toFixed(2) : 0
      };
    } catch (error) {
      throw new NotFoundException('Error al obtener estadísticas: ' + error.message);
    }
  }
}
