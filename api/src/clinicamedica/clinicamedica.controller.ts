import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    ParseIntPipe,
    Query,
    ValidationPipe,
    UsePipes
} from '@nestjs/common';
import { ClinicaMedicaService } from './clinicamedica.service';
import { CreateClinicaMedicaDto } from './dto/create-clinicamedica.dto';
import { UpdateClinicaMedicaDto } from './dto/update-clinicamedica.dto';

@Controller('clinicamedica')
export class ClinicaMedicaController {
    constructor(private readonly clinicaMedicaService: ClinicaMedicaService) {}

    // 📋 CREAR NUEVA HISTORIA CLÍNICA
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createClinicaMedicaDto: CreateClinicaMedicaDto) {
        return this.clinicaMedicaService.create(createClinicaMedicaDto);
    }

    // 📋 OBTENER TODAS LAS HISTORIAS CLÍNICAS
    @Get()
    findAll(@Query('paciente') nombrePaciente?: string) {
        if (nombrePaciente) {
            return this.clinicaMedicaService.findByPatientName(nombrePaciente);
        }
        return this.clinicaMedicaService.findAll();
    }

    // 📊 OBTENER ESTADÍSTICAS
    @Get('stats')
    getStats() {
        return this.clinicaMedicaService.getStats();
    }

    // 📋 OBTENER UNA HISTORIA CLÍNICA POR ID
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.clinicaMedicaService.findOne(id);
    }

    // 📋 ACTUALIZAR HISTORIA CLÍNICA
    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateClinicaMedicaDto: UpdateClinicaMedicaDto
    ) {
        return this.clinicaMedicaService.update(id, updateClinicaMedicaDto);
    }

    // 📋 ELIMINAR HISTORIA CLÍNICA
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.clinicaMedicaService.remove(id);
    }
}