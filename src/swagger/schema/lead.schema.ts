import {
  CreateLeadDto,
  LeadResponseDto,
} from 'src/modules/leads/dto/create-lead.dto';

export const LEAD_SCHEMA = {
  create: {
    method: 'post' as const,
    summary: 'Create a lead',
    description: 'Endpoint to create a new lead in the system.',
    bodyType: CreateLeadDto,
    response: [
      {
        status: 201,
        description: 'lead created successfully',
        type: LeadResponseDto,
      },
    ],
  },

  update: {
    method: 'patch' as const,
    summary: 'Update a lead',
    description: 'Endpoint to update an existing lead in the system.',
    bodyType: CreateLeadDto,
    response: [
      {
        status: 200,
        description: 'lead updated successfully',
        type: LeadResponseDto,
      },
    ],
  },

  delete: {
    method: 'delete' as const,
    summary: 'Delete a lead',
    description: 'Endpoint to delete a lead from the system.',
    response: [
      {
        status: 200,
        description: 'lead deleted successfully',
        type: String,
      },
    ],
  },

  get_lead: {
    method: 'get' as const,
    summary: 'Get a lead',
    description: 'Endpoint to retrieve a specific lead by its ID.',
    response: [
      {
        status: 200,
        description: 'lead retrieved successfully',
        type: LeadResponseDto,
      },
    ],
  },

  list_leads: {
    method: 'get' as const,
    summary: 'List all leads',
    description: 'Endpoint to retrieve all leads in the system.',
    response: [
      {
        status: 200,
        description: 'leads retrieved successfully',
        type: LeadResponseDto,
        isArray: true,
      },
    ],
  },
};
