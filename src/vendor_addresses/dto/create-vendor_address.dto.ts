import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";

export class CreateVendorAddressDto {
  @ApiProperty({ example: "123 Vendor St" })
  @IsString()
  address: string;

  @ApiProperty({ example: "City Center" })
  @IsString()
  location: string;

  @ApiProperty({ example: "41.311081" })
  @IsString()
  latitude: string;

  @ApiProperty({ example: "69.240562" })
  @IsString()
  longitude: string;

  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsNumber()
  delivery_radius_km?: number;

  @ApiProperty({ example: "09:00:00" })
  @IsOptional()
  @IsString()
  opening_time?: string;

  @ApiProperty({ example: "21:00:00" })
  @IsOptional()
  @IsString()
  closing_time?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_open: boolean;

  @ApiProperty({ example: 1 })
  @IsNumber()
  vendor_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  district_id: number;
}
