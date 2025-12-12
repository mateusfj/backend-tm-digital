import { LeadStatus } from 'src/common/enums/lead-status';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from '../properties/properties.entity';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: 'enum', enum: LeadStatus })
  status: LeadStatus;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => Property, (property: Property): Lead => property.lead)
  properties?: Property[];
}
