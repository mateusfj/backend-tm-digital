import { Injectable, NotFoundException } from '@nestjs/common';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';

@Injectable()
export class DeletePropertyUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<string> {
    const property = await this.propertyRepository.findOne(id);

    if (!property) throw new NotFoundException('Property not found');

    await this.propertyRepository.delete(id);

    return 'Property deleted successfully';
  }
}
