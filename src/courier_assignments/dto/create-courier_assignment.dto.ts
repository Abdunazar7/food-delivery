import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsIn,
} from "class-validator";

export class CreateCourierAssignmentDto {
  @ApiProperty({ example: 1, description: "Kuryer ID raqami" })
  @IsNumber()
  courier_id: number;

  @ApiProperty({ example: 12, description: "Buyurtma ID raqami" })
  @IsNumber()
  order_id: number;

  @ApiProperty({
    example: "assigned",
    description: "Tayinlash holati: assigned | accepted | rejected | completed",
    enum: ["assigned", "accepted", "rejected", "completed"],
  })
  @IsString()
  @IsIn(["assigned", "accepted", "rejected", "completed"])
  status: string;

  @ApiPropertyOptional({
    example: "2025-01-10T12:30:00Z",
    description:
      "Buyurtma tayinlangan vaqt (ixtiyoriy, agar hozirgi vaqt bo'lmasa)",
  })
  @IsOptional()
  @IsDateString()
  assigned_at?: string;

  @ApiPropertyOptional({
    example: "2025-01-10T12:45:00Z",
    description: "Kuryer qabul qilgan vaqt (ixtiyoriy)",
  })
  @IsOptional()
  @IsDateString()
  accepted_at?: string;

  @ApiPropertyOptional({
    example: "2025-01-10T13:00:00Z",
    description: "Yetkazib berish uchun olingan vaqt (ixtiyoriy)",
  })
  @IsOptional()
  @IsDateString()
  picked_up_at?: string;

  @ApiPropertyOptional({
    example: "2025-01-10T13:30:00Z",
    description: "Yetkazib berilgan vaqt (ixtiyoriy)",
  })
  @IsOptional()
  @IsDateString()
  delivered_at?: string;
}
