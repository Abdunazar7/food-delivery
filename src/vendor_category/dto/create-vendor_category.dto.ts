import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateVendorCategoryDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  vendor: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  category: number;
}
