import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  full_name: string;

  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "+998901234567" })
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  password: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  confirm_password: string;
}
