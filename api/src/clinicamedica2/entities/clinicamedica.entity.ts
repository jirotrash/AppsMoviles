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

    @Column({ type: 'varchar', length: 50, nullable: true })
    estado_civil: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    ocupacion: string;

    @Column({ type: 'text', nullable: true })
    domicilio: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefono: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    curp: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    correo_electronico: string;

    // INFORMACIÓN MÉDICA GENERAL
    @Column({ type: 'timestamp', nullable: true })
    fecha_ingreso: Date;

    @Column({ type: 'text', nullable: true })
    diagnostico_inicial: string;

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

    @Column({ type: 'varchar', length: 255, nullable: true })
    medico_asignado: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    area_internamiento: string;

    // SIGNOS VITALES
    @Column({ type: 'varchar', length: 20, nullable: true })
    presion_arterial: string;

    @Column({ type: 'int', nullable: true })
    frecuencia_cardiaca: number;

    @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true })
    temperatura_corporal: number;

    @Column({ type: 'int', nullable: true })
    saturacion_oxigeno: number;

    // DATOS FÍSICOS
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    peso: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    estatura: number;

    // NOTAS DE SEGUIMIENTO
    @Column({ type: 'text', nullable: true })
    notas_evolucion: string;

    @Column({ type: 'text', nullable: true })
    firma_medico: string;

    @Column({ type: 'timestamp', nullable: true })
    fecha_alta: Date;

    // IMÁGENES (Base64)
    @Column({ type: 'text', nullable: true })
    foto_paciente: string;

    @Column({ type: 'text', nullable: true })
    radiografia_torax: string;

    @Column({ type: 'text', nullable: true })
    electrocardiograma: string;

    @Column({ type: 'text', nullable: true })
    analisis_sangre: string;

    @Column({ type: 'text', nullable: true })
    resonancia_magnetica: string;

    @Column({ type: 'text', nullable: true })
    tomografia: string;

    @Column({ type: 'text', nullable: true })
    foto_herida: string;

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