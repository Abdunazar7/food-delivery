import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class CreateCourierDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  full_name: string;

  @ApiProperty({ example: "+998901234567" })
  @IsString()
  phone: string;

  @ApiProperty({ example: "courier@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  password: string;

  @ApiProperty({ example: "motorbike" })
  @IsString()
  vehicle_type: string;

  @ApiProperty({ example: "AB12345" })
  @IsString()
  license_number: string;
}
