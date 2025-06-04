import { IsString, IsNotEmpty, IsOptional, IsArray, IsInt, Min, Matches, ArrayNotEmpty, IsIn } from "class-validator";
import { Expose } from "class-transformer";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export class CreateShiftDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  shiftName: string;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid hex color" })
  color: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid start time" })
  startTime: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid end time" })
  endTime: string;

  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsIn(DAYS_OF_WEEK, { each: true })
  days: string[];

  @Expose()
  @IsInt()
  @Min(1)
  requiredAgents: number;
}
