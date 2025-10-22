import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('misimagenes')
export class MisImagen {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    imagen1: string;

    @Column({ type: 'text', nullable: true })
    imagen2: string;

    @Column({ type: 'text', nullable: true })
    imagen3: string;

    @Column({ type: 'text', nullable: true })
    imagen4: string;

    @Column({ type: 'text', nullable: true })
    imagen5: string;
}