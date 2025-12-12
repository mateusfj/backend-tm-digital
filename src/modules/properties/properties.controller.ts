import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyUseCase } from './use-cases/create-property/create.property.usecase';
import { GetPropertyUseCase } from './use-cases/get-property/get.property.usecase';
import { DeletePropertyUseCase } from './use-cases/delete-property/delete.property.usecase';
import { UpdatePropertyUseCase } from './use-cases/update-property/update.property.usecase';
import { ListPropertiesUseCase } from './use-cases/list-properties/list.properties.usecase';
import { ListPropertiesByLeadUseCase } from './use-cases/list-properties-by-lead/list.properties.by.lead.usecase';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import { PROPERTY_SCHEMA } from 'src/swagger/schema/property.schema';
import { SwaggerDocs } from 'src/common/decorators/swagger.decorator';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly createPropertyUseCase: CreatePropertyUseCase,
    private readonly getPropertyUseCase: GetPropertyUseCase,
    private readonly deletePropertyUseCase: DeletePropertyUseCase,
    private readonly updatePropertyUseCase: UpdatePropertyUseCase,
    private readonly listPropertiesUseCase: ListPropertiesUseCase,
    private readonly listPropertiesByLeadUseCase: ListPropertiesByLeadUseCase,
  ) {}

  @SwaggerDocs(PROPERTY_SCHEMA.create)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto): Promise<Property> {
    return this.createPropertyUseCase.execute(createPropertyDto);
  }

  @SwaggerDocs(PROPERTY_SCHEMA.list_properties)
  @Get()
  findAll(): Promise<Property[]> {
    return this.listPropertiesUseCase.execute();
  }

  @SwaggerDocs(PROPERTY_SCHEMA.list_properties_by_lead)
  @Get('lead/:leadId')
  findByLead(
    @Param('leadId', new ParseUUIDPipe()) leadId: string,
  ): Promise<Property[]> {
    return this.listPropertiesByLeadUseCase.execute(leadId);
  }

  @SwaggerDocs(PROPERTY_SCHEMA.get_property)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Property> {
    return this.getPropertyUseCase.execute(id);
  }

  @SwaggerDocs(PROPERTY_SCHEMA.update)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    return this.updatePropertyUseCase.execute(id, updatePropertyDto);
  }

  @SwaggerDocs(PROPERTY_SCHEMA.delete)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
    return this.deletePropertyUseCase.execute(id);
  }
}
