import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ example: "Fast Food" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Foods that are prepared quickly" })
  @IsString()
  description: string;

  @ApiProperty({ example: "https://cdn.example.com/icons/fastfood.png" })
  @IsString()
  icon_url: string;
}
