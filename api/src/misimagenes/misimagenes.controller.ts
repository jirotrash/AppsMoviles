import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    ValidationPipe
} from '@nestjs/common';
import { MisImagenesService } from './misimagenes.service';
import { CreateMisImagenDto } from './dto/create-misimagen.dto';
import { UpdateMisImagenDto } from './dto/update-misimagen.dto';

@Controller('misimagenes')
export class MisImagenesController {
    constructor(
        private readonly misImagenesService: MisImagenesService
    ) {}

    @Post()
    async create(@Body(new ValidationPipe()) createMisImagenDto: CreateMisImagenDto) {
        return await this.misImagenesService.create(createMisImagenDto);
    }

    @Get()
    async findAll() {
        return await this.misImagenesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.misImagenesService.findOne(id);
    }

    @Get(':id/imagenes')
    async getImagenes(@Param('id') id: number) {
        return await this.misImagenesService.getImagenes(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number, 
        @Body(new ValidationPipe()) updateMisImagenDto: UpdateMisImagenDto
    ) {
        return await this.misImagenesService.update(id, updateMisImagenDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.misImagenesService.remove(id);
        return { message: 'Registro eliminado exitosamente' };
    }
}