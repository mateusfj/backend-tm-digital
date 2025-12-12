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
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { CreateLeadUseCase } from './use-cases/create-lead/create.lead.usecase';
import { GetLeadUseCase } from './use-cases/get-lead/get.lead.usecase';
import { DeleteLeadUseCase } from './use-cases/delete-lead/delete.lead.usecase';
import { UpdateLeadUseCase } from './use-cases/update-lead/update.lead.usecase';
import { ListLeadsUseCase } from './use-cases/list-leads/list.leads.usecase';
import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';
import { LEAD_SCHEMA } from 'src/swagger/schema/lead.schema';
import { SwaggerDocs } from 'src/common/decorators/swagger.decorator';

@Controller('leads')
export class LeadsController {
  constructor(
    private readonly createLeadUseCase: CreateLeadUseCase,
    private readonly getLeadUseCase: GetLeadUseCase,
    private readonly deleteLeadUseCase: DeleteLeadUseCase,
    private readonly updateLeadUseCase: UpdateLeadUseCase,
    private readonly listLeadsUseCase: ListLeadsUseCase,
  ) {}

  @SwaggerDocs(LEAD_SCHEMA.create)
  @Post()
  create(@Body() createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.createLeadUseCase.execute(createLeadDto);
  }

  @SwaggerDocs(LEAD_SCHEMA.list_leads)
  @Get()
  findAll(): Promise<Lead[]> {
    return this.listLeadsUseCase.execute();
  }

  @SwaggerDocs(LEAD_SCHEMA.get_lead)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Lead> {
    return this.getLeadUseCase.execute(id);
  }

  @SwaggerDocs(LEAD_SCHEMA.update)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ): Promise<Lead> {
    return this.updateLeadUseCase.execute(id, updateLeadDto);
  }

  @SwaggerDocs(LEAD_SCHEMA.delete)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
    return this.deleteLeadUseCase.execute(id);
  }
}
