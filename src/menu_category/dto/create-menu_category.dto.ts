import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class CreateMenuCategoryDto {
  @ApiProperty({ example: "Pizza" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: "Italian pizza menu" })
  @IsOptional()
  @IsString()
  description?: string;
}
