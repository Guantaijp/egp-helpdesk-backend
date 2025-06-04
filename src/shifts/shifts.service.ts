import { Injectable, NotFoundException, Logger } from "@nestjs/common"
import { InjectModel } from '@nestjs/sequelize'
import { Shift } from "./models/shift.model"
import type { CreateShiftDto } from "./dto/create-shift.dto"
import type { UpdateShiftDto } from "./dto/update-shift.dto"

@Injectable()
export class ShiftsService {
  private readonly logger = new Logger(ShiftsService.name)

  constructor(@InjectModel(Shift) private shiftModel: typeof Shift) {}

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    this.logger.log(`Creating shift with data: ${JSON.stringify(createShiftDto)}`)
    this.logger.log(`Name received: "${createShiftDto.shiftName}"`)

    try {
      const shift = await this.shiftModel.create({
        shiftName: createShiftDto.shiftName,
        description: createShiftDto.description ?? "",
        color: createShiftDto.color,
        startTime: createShiftDto.startTime,
        endTime: createShiftDto.endTime,
        days: createShiftDto.days,
        requiredAgents: createShiftDto.requiredAgents,
      } as any)

      this.logger.log(`Shift created successfully: ${JSON.stringify(shift.toJSON())}`)
      return shift
    } catch (error) {
      this.logger.error(`Error creating shift: ${error.message}`)
      throw error
    }
  }

  async findAll(): Promise<Shift[]> {
    return this.shiftModel.findAll({
      order: [["createdAt", "DESC"]],
    })
  }

  async findOne(id: string): Promise<Shift> {
    const shift = await this.shiftModel.findByPk(id)
    if (!shift) {
      throw new NotFoundException(`Shift with ID ${id} not found`)
    }
    return shift
  }

  async update(id: string, updateShiftDto: UpdateShiftDto): Promise<Shift> {
    this.logger.log(`Updating shift ${id} with data: ${JSON.stringify(updateShiftDto)}`)

    const shift = await this.findOne(id)

    await shift.update({
      ...updateShiftDto,
    })

    this.logger.log(`Shift updated successfully: ${JSON.stringify(shift.toJSON())}`)
    return shift
  }

  async remove(id: string): Promise<void> {
    const shift = await this.findOne(id)
    await shift.destroy()
    this.logger.log(`Shift ${id} deleted successfully`)
  }
}