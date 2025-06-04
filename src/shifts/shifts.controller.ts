import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Logger, Req } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import type { CreateShiftDto } from "./dto/create-shift.dto"
import type { UpdateShiftDto } from "./dto/update-shift.dto"
import { Shift } from "./entities/shift.entity"
import { ShiftsService } from "./shifts.service"
import { Request } from 'express'

@ApiTags("shifts")
@Controller("shifts")
export class ShiftsController {
  private readonly logger = new Logger(ShiftsController.name)

  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shift' })
  @ApiResponse({
    status: 201,
    description: 'The shift has been successfully created.',
    type: Shift,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createShiftDto: CreateShiftDto, @Req() request: Request): Promise<Shift> {
    // Log raw request body to see what's actually sent
    this.logger.log(`=== RAW REQUEST DEBUG ===`);
    this.logger.log(`Raw request body: ${JSON.stringify(request.body)}`);
    this.logger.log(`Request headers: ${JSON.stringify(request.headers)}`);
    
    // Log what we receive after validation
    this.logger.log(`=== AFTER VALIDATION DEBUG ===`);
    this.logger.log(`createShiftDto type: ${typeof createShiftDto}`);
    this.logger.log(`createShiftDto constructor: ${createShiftDto?.constructor?.name}`);
    this.logger.log(`createShiftDto: ${JSON.stringify(createShiftDto)}`);
    
    // Check if createShiftDto is undefined or null
    if (!createShiftDto) {
      this.logger.error(`createShiftDto is ${createShiftDto}! This indicates a validation pipe issue.`);
      // Fallback to raw body for debugging
      const rawBody = request.body;
      this.logger.log(`Using raw body as fallback: ${JSON.stringify(rawBody)}`);
    }
    
    // Log each property individually
    if (createShiftDto) {
      this.logger.log(`Name: "${createShiftDto.shiftName}" (type: ${typeof createShiftDto.shiftName})`);
      this.logger.log(`Description: "${createShiftDto.description}"`);
      this.logger.log(`Color: "${createShiftDto.color}"`);
      this.logger.log(`Start Time: "${createShiftDto.startTime}"`);
      this.logger.log(`End Time: "${createShiftDto.endTime}"`);
      this.logger.log(`Days: ${JSON.stringify(createShiftDto.days)}`);
      this.logger.log(`Required Agents: ${createShiftDto.requiredAgents}`);
    }

    try {
      const result = await this.shiftsService.create(createShiftDto);
      this.logger.log(`Successfully created shift: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error creating shift: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all shifts" })
  @ApiResponse({
    status: 200,
    description: "Return all shifts.",
    type: [Shift],
  })
  findAll(): Promise<Shift[]> {
    return this.shiftsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shift by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the shift.',
    type: Shift,
  })
  @ApiResponse({ status: 404, description: 'Shift not found.' })
  findOne(@Param('id') id: string): Promise<Shift> {
    return this.shiftsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a shift" })
  @ApiResponse({
    status: 200,
    description: "The shift has been successfully updated.",
    type: Shift,
  })
  @ApiResponse({ status: 404, description: "Shift not found." })
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto): Promise<Shift> {
    this.logger.log(`Updating shift ${id} with data: ${JSON.stringify(updateShiftDto)}`);
    return this.shiftsService.update(id, updateShiftDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a shift' })
  @ApiResponse({
    status: 204,
    description: 'The shift has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Shift not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.shiftsService.remove(id);
  }
}