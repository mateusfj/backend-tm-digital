import {
  CreatePropertyDto,
  PropertyResponseDto,
} from 'src/modules/properties/dto/create-property.dto';

export const PROPERTY_SCHEMA = {
  create: {
    method: 'post' as const,
    summary: 'Create a property',
    description: 'Endpoint to create a new property in the system.',
    bodyType: CreatePropertyDto,
    response: [
      {
        status: 201,
        description: 'property created successfully',
        type: PropertyResponseDto,
      },
    ],
  },

  update: {
    method: 'patch' as const,
    summary: 'Update a property',
    description: 'Endpoint to update an existing property in the system.',
    bodyType: CreatePropertyDto,
    response: [
      {
        status: 200,
        description: 'property updated successfully',
        type: PropertyResponseDto,
      },
    ],
  },

  delete: {
    method: 'delete' as const,
    summary: 'Delete a property',
    description: 'Endpoint to delete a property from the system.',
    response: [
      {
        status: 200,
        description: 'property deleted successfully',
        type: String,
      },
    ],
  },

  get_property: {
    method: 'get' as const,
    summary: 'Get a property',
    description: 'Endpoint to retrieve a specific property by its ID.',
    response: [
      {
        status: 200,
        description: 'property retrieved successfully',
        type: PropertyResponseDto,
      },
    ],
  },

  list_properties: {
    method: 'get' as const,
    summary: 'List all properties',
    description: 'Endpoint to retrieve all properties in the system.',
    response: [
      {
        status: 200,
        description: 'properties retrieved successfully',
        type: PropertyResponseDto,
        isArray: true,
      },
    ],
  },

  list_properties_by_lead: {
    method: 'get' as const,
    summary: 'List properties by lead',
    description:
      'Endpoint to retrieve all properties associated with a specific lead.',
    response: [
      {
        status: 200,
        description: 'properties retrieved successfully',
        type: PropertyResponseDto,
        isArray: true,
      },
    ],
  },
};
