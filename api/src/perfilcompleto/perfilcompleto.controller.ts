import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PerfilCompletoService } from './perfilcompleto.service';
import { CreatePerfilCompletoDto } from './dto/create-perfilcompleto.dto';
import { UpdatePerfilCompletoDto } from './dto/update-perfilcompleto.dto';

@Controller('api/dsm44/perfilcompleto')
export class PerfilCompletoController {
  constructor(private readonly perfilCompletoService: PerfilCompletoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPerfilCompletoDto: CreatePerfilCompletoDto) {
    try {
      const perfilCompleto = await this.perfilCompletoService.create(createPerfilCompletoDto);
      return {
        success: true,
        message: 'Perfil completo creado exitosamente',
        data: perfilCompleto
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al crear el perfil completo',
        data: null
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const perfilesCompletos = await this.perfilCompletoService.findAll();
      return {
        success: true,
        message: 'Perfiles completos obtenidos exitosamente',
        data: perfilesCompletos
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener los perfiles completos',
        data: []
      };
    }
  }

  @Get('stats')
  async getStats() {
    try {
      const stats = await this.perfilCompletoService.getStats();
      return {
        success: true,
        message: 'Estadísticas obtenidas exitosamente',
        data: stats
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener estadísticas',
        data: null
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const perfilCompleto = await this.perfilCompletoService.findOne(+id);
      return {
        success: true,
        message: 'Perfil completo obtenido exitosamente',
        data: perfilCompleto
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener el perfil completo',
        data: null
      };
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePerfilCompletoDto: UpdatePerfilCompletoDto) {
    try {
      const perfilCompleto = await this.perfilCompletoService.update(+id, updatePerfilCompletoDto);
      return {
        success: true,
        message: 'Perfil completo actualizado exitosamente',
        data: perfilCompleto
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al actualizar el perfil completo',
        data: null
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.perfilCompletoService.remove(+id);
      return {
        success: true,
        message: result.message,
        data: null
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al eliminar el perfil completo',
        data: null
      };
    }
  }

  @Get('usuario/:usuario')
  async findByUsername(@Param('usuario') usuario: string) {
    try {
      const perfilCompleto = await this.perfilCompletoService.findByUsername(usuario);
      return {
        success: true,
        message: 'Perfil completo obtenido exitosamente',
        data: perfilCompleto
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al obtener el perfil completo',
        data: null
      };
    }
  }
}