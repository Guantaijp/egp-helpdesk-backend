import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { ShiftsService } from "./shifts.service" // Remove 'type' keyword
import type { CreateShiftDto } from "./dto/create-shift.dto"
import type { UpdateShiftDto } from "./dto/update-shift.dto"
import { Shift } from "./entities/shift.entity"

@ApiTags("shifts")
@Controller("shifts")
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shift' })
  @ApiResponse({
    status: 201,
    description: 'The shift has been successfully created.',
    type: Shift,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createShiftDto: CreateShiftDto): Promise<Shift> {
    return this.shiftsService.create(createShiftDto);
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