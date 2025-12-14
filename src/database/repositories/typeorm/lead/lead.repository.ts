import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Lead } from './lead.entity';
import { LeadRepositoryInterface } from './lead.interface';
import type { ListLeadsQueryDto } from 'src/modules/leads/dto/list-leads.query.dto';

@Injectable()
export class LeadRepository implements LeadRepositoryInterface {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async findOneByCpf(cpf: string): Promise<Lead> {
    const lead = await this.leadRepository.findOneBy({
      cpf,
    });
    return lead;
  }

  async create(data: Lead): Promise<Lead> {
    const lead = await this.leadRepository.save(data);
    return lead;
  }

  async findAll(): Promise<Lead[]> {
    const leads: Lead[] = await this.leadRepository.find();
    return leads;
  }

  async findAllWithFilters(query: ListLeadsQueryDto): Promise<Lead[]> {
    const where: FindOptionsWhere<Lead> = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.municipality) {
      where.city = query.municipality;
    }

    if (query.search) {
      where.name = ILike(`%${query.search.trim()}%`);
    }

    return this.leadRepository.find({ where });
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.leadRepository.findOne({ where: { id } });
    return lead;
  }

  async delete(id: string): Promise<void> {
    await this.leadRepository.softDelete({ id });
  }

  async update(data: Lead): Promise<void> {
    await this.leadRepository.update(data.id, {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      status: data.status,
      comments: data.comments,
      city: data.city,
      phone: data.phone,
    });
  }
}
