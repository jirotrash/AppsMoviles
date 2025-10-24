import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareaModule } from './tareas/tarea.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './tareas/entities/tarea.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { MisImagenesModule } from './misimagenes/misimagenes.module';
import { MisImagen } from './misimagenes/entities/misimagen.entity';
import { ClinicaMedicaModule } from './clinicamedica/clinicamedica.module';
import { ClinicaMedica } from './clinicamedica/entities/clinicamedica.entity';
import { PerfilCompletoModule } from './perfilcompleto/perfilcompleto.module';
import { PerfilCompleto } from './perfilcompleto/entities/perfilcompleto.entity';
import { ClinicaMedica2Module } from './clinicamedica2/clinicamedica2.module';
import { ClinicaMedica as ClinicaMedica2 } from './clinicamedica2/entities/clinicamedica.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: 'usuarios',
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "chuchoivan",
            password: "kfeputo123",
            database: "dsm442025",
            entities:  [ Usuario ],
            synchronize: true,
            autoLoadEntities: true,
        }),
        TypeOrmModule.forRoot({
            name: 'tareas',
            type: "mariadb",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "dsm44",
            entities:  [ Tarea ],
            synchronize: true,
            autoLoadEntities: true,
        }),
        TypeOrmModule.forRoot({
            name: 'lasimagenes',
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "chuchoivan",
            password: "kfeputo123",
            database: "lasimagenes",
            entities: [ MisImagen ],
            synchronize: true,
            autoLoadEntities: true,
        }),
        TypeOrmModule.forRoot({
            name: 'clinicamedica',
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "chuchoivan",
            password: "kfeputo123",
            database: "clinicamedica",
            entities: [ ClinicaMedica ],
            synchronize: true,
            autoLoadEntities: true,
        }),
        TypeOrmModule.forRoot({
            name: 'perfilcompleto',
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "perfilcompleto",
            entities: [ PerfilCompleto ],
            synchronize: true,
            autoLoadEntities: true,
        }),
        TypeOrmModule.forRoot({
            name: 'clinicamedica2',
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "chuchoivan",
            password: "kfeputo123",
            database: "clinicamedica2",
            entities: [ ClinicaMedica2 ],
            synchronize: true,
            autoLoadEntities: true,
        }),
        TareaModule,
        UsuariosModule,
        MisImagenesModule,
        ClinicaMedicaModule,
        PerfilCompletoModule,
        ClinicaMedica2Module,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
