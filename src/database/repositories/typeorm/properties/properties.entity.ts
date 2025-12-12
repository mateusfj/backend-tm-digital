import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Lead } from '../lead/lead.entity';
import { Crop } from 'src/common/enums/crop';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Lead, (lead: Lead): Property[] => lead.properties, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lead_id' })
  lead: Lead;

  @Column({ type: 'uuid' })
  lead_id: string;

  @Column({
    type: 'enum',
    enum: Crop,
  })
  crop: Crop;

  @Column('decimal', { precision: 10, scale: 2 })
  area: number;

  @Column({ type: 'text', nullable: true })
  geometry: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
