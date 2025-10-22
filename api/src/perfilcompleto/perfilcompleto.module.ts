import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilCompletoService } from './perfilcompleto.service';
import { PerfilCompletoController } from './perfilcompleto.controller';
import { PerfilCompleto } from './entities/perfilcompleto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PerfilCompleto], 'perfilcompleto')
  ],
  controllers: [PerfilCompletoController],
  providers: [PerfilCompletoService],
  exports: [PerfilCompletoService]
})
export class PerfilCompletoModule {}
