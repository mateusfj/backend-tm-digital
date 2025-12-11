import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum LeadStatus {
  NEW = 'new',
  INITIAL_CONTACT = 'initial_contact',
  NEGOTIATING = 'negotiating',
  CONVERTED = 'converted',
  LOST = 'lost',
}

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
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
