import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MisImagenesController } from './misimagenes.controller';
import { MisImagenesService } from './misimagenes.service';
import { MisImagen } from './entities/misimagen.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([MisImagen], 'lasimagenes')
    ],
    controllers: [MisImagenesController],
    providers: [MisImagenesService],
    exports: [MisImagenesService]
})
export class MisImagenesModule {}