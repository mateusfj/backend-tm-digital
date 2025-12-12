import { PropertyRepository } from 'src/database/repositories/typeorm/properties/properties.repository';
import { CreatePropertyUseCase } from './use-cases/create-property/create.property.usecase';
import { GetPropertyUseCase } from './use-cases/get-property/get.property.usecase';
import { DeletePropertyUseCase } from './use-cases/delete-property/delete.property.usecase';
import { UpdatePropertyUseCase } from './use-cases/update-property/update.property.usecase';
import { ListPropertiesUseCase } from './use-cases/list-properties/list.properties.usecase';
import { ListPropertiesByLeadUseCase } from './use-cases/list-properties-by-lead/list.properties.by.lead.usecase';
import { PROPERTY_REPOSITORY_INTERFACE } from 'src/database/repositories/typeorm/properties/properties.interface';
import { Provider } from '@nestjs/common';

export const PROPERTIES_PROVIDERS: Provider[] = [
  PropertyRepository,
  {
    provide: PROPERTY_REPOSITORY_INTERFACE,
    useClass: PropertyRepository,
  },
  {
    provide: CreatePropertyUseCase,
    useFactory: (propertyRepository: PropertyRepository) => {
      return new CreatePropertyUseCase(propertyRepository);
    },
    inject: [PROPERTY_REPOSITORY_INTERFACE],
  },
  {
    provide: GetPropertyUseCase,
    useFactory: (propertyRepository: PropertyRepository) => {
      return new GetPropertyUseCase(propertyRepository);
    },
    inject: [PROPERTY_REPOSITORY_INTERFACE],
  },
  {
    provide: DeletePropertyUseCase,
    useFactory: (propertyRepository: PropertyRepository) => {
      return new DeletePropertyUseCase(propertyRepository);
    },
    inject: [PROPERTY_REPOSITORY_INTERFACE],
  },
  {
    provide: UpdatePropertyUseCase,
    useFactory: (propertyRepository: PropertyRepository) => {
      return new UpdatePropertyUseCase(propertyRepository);
    },
    inject: [PROPERTY_REPOSITORY_INTERFACE],
  },
  {
    provide: ListPropertiesUseCase,
    useFactory: (propertyRepository: PropertyRepository) => {
      return new ListPropertiesUseCase(propertyRepository);
    },
    inject: [PROPERTY_REPOSITORY_INTERFACE],
  },
  {
    provide: ListPropertiesByLeadUseCase,
    useFactory: (propertyRepository: PropertyRepository) => {
      return new ListPropertiesByLeadUseCase(propertyRepository);
    },
    inject: [PROPERTY_REPOSITORY_INTERFACE],
  },
];
