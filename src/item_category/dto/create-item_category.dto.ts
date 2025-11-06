import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateItemCategoryDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  menu_item_id: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  category_id: number;
}
