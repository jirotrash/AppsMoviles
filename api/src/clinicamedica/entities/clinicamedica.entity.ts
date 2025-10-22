import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'clinica_medica' })
export class ClinicaMedica {
    @PrimaryGeneratedColumn()
    id: number;

    // DATOS PERSONALES DEL PACIENTE
    @Column({ type: 'varchar', length: 255 })
    nombre_paciente: string;

    @Column({ type: 'int' })
    edad: number;

    @Column({ type: 'varchar', length: 20 })
    sexo: string;

    @Column({ type: 'varchar', length: 50 })
    estado_civil: string;

    @Column({ type: 'varchar', length: 255 })
    ocupacion: string;

    @Column({ type: 'text' })
    domicilio: string;

    @Column({ type: 'varchar', length: 20 })
    telefono: string;

    // INFORMACIÓN MÉDICA
    @Column({ type: 'text', nullable: true })
    alergias: string;

    @Column({ type: 'text', nullable: true })
    enfermedades_previas: string;

    @Column({ type: 'text', nullable: true })
    cirugias_anteriores: string;

    @Column({ type: 'text', nullable: true })
    medicamentos_actuales: string;

    @Column({ type: 'varchar', length: 10 })
    grupo_sanguineo: string;

    @Column({ type: 'text', nullable: true })
    antecedentes_familiares: string;

    // DATOS FÍSICOS
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    peso: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    estatura: number;

    // IMÁGENES (Base64)
    @Column({ type: 'text', nullable: true })
    foto_paciente: string;

    @Column({ type: 'text', nullable: true })
    identificacion_oficial: string;

    @Column({ type: 'text', nullable: true })
    resultados_laboratorio: string;

    @Column({ type: 'text', nullable: true })
    radiografia_ultrasonido: string;

    @Column({ type: 'text', nullable: true })
    receta_medica: string;

    @Column({ type: 'text', nullable: true })
    seguro_medico: string;

    // METADATA
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_creacion: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fecha_actualizacion: Date;
}