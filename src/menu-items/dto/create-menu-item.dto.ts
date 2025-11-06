import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
} from "class-validator";

export class CreateMenuItemDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  vendor_id: number;

  @ApiProperty({ example: "Pizza" })
  @IsOptional()
  @IsString()
  category_name?: string;

  @ApiProperty({ example: "Margherita" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Tomato, cheese, basil" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "medium" })
  size: string;

  @ApiProperty({ example: "Extra cheese, gluten-free" })
  @IsString()
  features: string;

  @ApiProperty({ example: 25.5 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 350 })
  @IsOptional()
  @IsNumber()
  calories?: number;

  @ApiProperty({ example: "https://example.com/image.jpg" })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  is_available?: boolean;

  @ApiProperty({ example: 15 })
  @IsOptional()
  @IsNumber()
  preparation_time_minutes?: number;
}
