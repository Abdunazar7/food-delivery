import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsSemVer, IsString } from "class-validator";

export class CreateOrderItemDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  order_id: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  menu_item_id: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: "No onions, please" })
  @IsString()
  notes: string;
}
