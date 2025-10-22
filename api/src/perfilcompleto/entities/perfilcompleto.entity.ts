import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('perfil_completo')
export class PerfilCompleto {
    @PrimaryGeneratedColumn()
    id: number;

    // CAMPOS REQUERIDOS
    @Column({ type: 'varchar', length: 255 })
    nombre_completo: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    usuario: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    correo: string;

    @Column({ type: 'varchar', length: 255 })
    contrasena: string;

    @Column({ type: 'varchar', length: 50 })
    telefono: string;

    // CAMPOS OPCIONALES
    @Column({ type: 'varchar', length: 255, nullable: true })
    ocupacion?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    pais?: string;

    @Column({ type: 'text', nullable: true })
    idiomas?: string;

    @Column({ type: 'text', nullable: true })
    habilidades?: string;

    @Column({ type: 'text', nullable: true })
    descripcion_personal?: string;

    @Column({ type: 'text', nullable: true })
    redes_sociales?: string;

    @Column({ type: 'text', nullable: true })
    experiencia?: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    portafolio_web?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    preferencia_notificaciones?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    tipo_cuenta?: string;

    // IMÁGENES (almacenadas como texto base64)
    @Column({ type: 'text', nullable: true })
    foto_perfil?: string;

    @Column({ type: 'text', nullable: true })
    imagen_portada?: string;

    @Column({ type: 'text', nullable: true })
    certificado?: string;

    @Column({ type: 'text', nullable: true })
    comprobante_identidad?: string;

    @Column({ type: 'text', nullable: true })
    portafolio_visual?: string;

    // TIMESTAMPS
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}