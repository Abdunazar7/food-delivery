import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

export class CreateDistrictDto {
  @ApiProperty({ example: "Chilonzor" })
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  region_id: number;
}
