import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Logger } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { ShiftsService } from "./shifts.service"
import type { CreateShiftDto } from "./dto/create-shift.dto"
import type { UpdateShiftDto } from "./dto/update-shift.dto"
import { Shift } from "./models/shift.model"

@ApiTags("shifts")
@Controller("shifts")
export class ShiftsController {
  private readonly logger = new Logger(ShiftsController.name)

  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new shift" })
  @ApiResponse({
    status: 201,
    description: "The shift has been successfully created.",
    type: Shift,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  async create(@Body() createShiftDto: CreateShiftDto): Promise<Shift> {
    this.logger.log(`=== CONTROLLER CREATE SHIFT ===`)
    this.logger.log(`Received DTO: ${JSON.stringify(createShiftDto)}`)
    this.logger.log(`ShiftName: "${createShiftDto.shiftName}"`);
    this.logger.log(`Description: "${createShiftDto.description}"`)
    this.logger.log(`Color: "${createShiftDto.color}"`)
    this.logger.log(`Days: ${JSON.stringify(createShiftDto.days)}`)

    const result = await this.shiftsService.create(createShiftDto)
    
    this.logger.log(`=== CONTROLLER RESPONSE ===`)
    this.logger.log(`Created shift: ${JSON.stringify(result.toJSON())}`)
    
    return result.toJSON() as Shift
  }

  @Get()
  @ApiOperation({ summary: "Get all shifts" })
  @ApiResponse({
    status: 200,
    description: "Return all shifts.",
    type: [Shift],
  })
  async findAll(): Promise<Shift[]> {
    const entities = await this.shiftsService.findAll();
    return entities.map(entity => entity.toJSON() as Shift);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a shift by id" })
  @ApiResponse({
    status: 200,
    description: "Return the shift.",
    type: Shift,
  })
  @ApiResponse({ status: 404, description: "Shift not found." })
  async findOne(@Param("id") id: string): Promise<Shift> {
    const entity = await this.shiftsService.findOne(id);
    return entity.toJSON() as Shift;
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a shift" })
  @ApiResponse({
    status: 200,
    description: "The shift has been successfully updated.",
    type: Shift,
  })
  @ApiResponse({ status: 404, description: "Shift not found." })
  async update(@Param("id") id: string, @Body() updateShiftDto: UpdateShiftDto): Promise<Shift> {
    this.logger.log(`=== CONTROLLER UPDATE SHIFT ===`)
    this.logger.log(`Updating shift ${id} with: ${JSON.stringify(updateShiftDto)}`)

    const result = await this.shiftsService.update(id, updateShiftDto)

    this.logger.log(`=== CONTROLLER UPDATE RESPONSE ===`)
    this.logger.log(`Updated shift: ${JSON.stringify(result.toJSON())}`)

    return result.toJSON() as Shift
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a shift" })
  @ApiResponse({
    status: 204,
    description: "The shift has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Shift not found." })
  async remove(@Param("id") id: string): Promise<void> {
    return this.shiftsService.remove(id)
  }
}
