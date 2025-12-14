import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Lead } from '../lead/lead.entity';
import { Crop } from 'src/common/enums/crop';
import { PropertyType } from 'src/common/enums/property-type';

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

  @Column({ type: 'text' })
  name: string;

  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  property_type: PropertyType;

  @Column({
    type: 'enum',
    enum: Crop,
  })
  crop: Crop;

  @Column('decimal', { precision: 10, scale: 2 })
  area: number;

  @Column({ type: 'text', nullable: true })
  municipality: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
