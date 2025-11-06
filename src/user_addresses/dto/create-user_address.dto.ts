import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateUserAddressDto {
  @ApiProperty({ example: "Home" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Near Central Park" })
  @IsString()
  description: string;

  @ApiProperty({ example: "123 Main Street" })
  @IsString()
  address?: string;

  @ApiProperty({ example: 41.311081 })
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: 69.240562 })
  @IsNumber()
  longitude?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  district_id: number;
}
