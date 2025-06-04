import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsArray, IsInt, Min, Matches, ArrayNotEmpty, IsIn } from "class-validator"

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export class CreateShiftDto {
  @ApiProperty({ description: "Name of the shift", example: "Morning Shift" })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: "Description of the shift",
    example: "Regular morning hours",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    description: "Color code for the shift",
    example: "#22d3ee",
  })
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: "Color must be a valid hex color code",
  })
  color: string

  @ApiProperty({
    description: "Start time of the shift",
    example: "09:00",
  })
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Start time must be in HH:MM format",
  })
  startTime: string

  @ApiProperty({
    description: "End time of the shift",
    example: "17:00",
  })
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "End time must be in HH:MM format",
  })
  endTime: string

  @ApiProperty({
    description: "Days of the week for the shift",
    example: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(DAYS_OF_WEEK, { each: true })
  days: string[]

  @ApiProperty({
    description: "Number of required agents for the shift",
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  requiredAgents: number
}
