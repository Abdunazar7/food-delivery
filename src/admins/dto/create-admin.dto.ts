import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString, IsBoolean } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "John Admin" })
  @IsString()
  full_name: string;

  @ApiProperty({ example: "admin@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "+998901234567" })
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  password: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  is_creator: boolean;
}
