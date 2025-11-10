import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsEmail,
} from "class-validator";

export class CreateVendorDto {
  @ApiProperty({ example: "Pizza Place" })
  @IsString()
  name: string;

  @ApiProperty({ example: "owner@example.com" })
  @IsOptional()
  @IsEmail()
  owner_email?: string;

  @ApiProperty({ example: "+998901234567" })
  @IsOptional()
  @IsPhoneNumber("UZ")
  owner_phone?: string;

  @ApiProperty({ example: "password123" })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ example: "Best pizza in town" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "https://logo.url/image.png" })
  @IsOptional()
  @IsString()
  logo_url?: string;
}
