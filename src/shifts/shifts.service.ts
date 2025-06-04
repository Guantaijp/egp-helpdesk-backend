import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import type { CreateShiftDto } from "./dto/create-shift.dto"
import type { UpdateShiftDto } from "./dto/update-shift.dto"
import { Shift } from "./entities/shift.entity"

@Injectable()
export class ShiftsService {
  private shiftRepository: Repository<Shift>

  constructor(
    @InjectRepository(Shift)
    shiftRepository: Repository<Shift>,
  ) {
    this.shiftRepository = shiftRepository;
  }

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    const shift = this.shiftRepository.create(createShiftDto)
    return await this.shiftRepository.save(shift)
  }

  async findAll(): Promise<Shift[]> {
    return await this.shiftRepository.find({
      order: { createdAt: "DESC" },
    })
  }

  async findOne(id: string): Promise<Shift> {
    const shift = await this.shiftRepository.findOne({ where: { id } })
    if (!shift) {
      throw new NotFoundException(`Shift with ID ${id} not found`)
    }
    return shift
  }

  async update(id: string, updateShiftDto: UpdateShiftDto): Promise<Shift> {
    const shift = await this.findOne(id)
    Object.assign(shift, updateShiftDto)
    return await this.shiftRepository.save(shift)
  }

  async remove(id: string): Promise<void> {
    const shift = await this.findOne(id)
    await this.shiftRepository.remove(shift)
  }
}
