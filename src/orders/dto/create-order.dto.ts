import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
  IsPositive,
  Min,
} from "class-validator";

const validStatuses = [
  "pending",
  "accepted",
  "preparing",
  "on_the_way",
  "delivered",
  "canceled",
];

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: "Buyurtma yaratgan foydalanuvchi ID raqami",
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: 2,
    description: "Buyurtma berilgan vendor (restoran) ID raqami",
  })
  @IsNumber()
  vendor_id: number;

  @ApiPropertyOptional({
    example: 3,
    description: "Buyurtmani yetkazib beruvchi kuryer ID (ixtiyoriy)",
  })
  @IsOptional()
  @IsNumber()
  courier_id?: number;

  @ApiProperty({
    example: "pending",
    description: "Buyurtma holati",
    enum: validStatuses,
  })
  @IsString()
  @IsIn(validStatuses)
  status: string;

  @ApiProperty({
    example: 45000.5,
    description: "Buyurtmaning jami narxi (total_amount)",
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  total_price: number; // Entity'da total_price, DDL'da total_amount. Entity'ga moslandi.

  @ApiPropertyOptional({
    example: 5000.0,
    description: "Yetkazib berish narxi",
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  delivery_fee?: number;

  @ApiPropertyOptional({
    example: 2000.0,
    description: "Kuryer uchun choychaqa (tip)",
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  tip_amount?: number;

  @ApiProperty({
    // DTO'da 'required' sifatida, lekin DDL'da NOT NULL
    example: 5,
    description: "Vendor manzili ID",
  })
  @IsNumber()
  vendor_address_id: number; // DDL'da NOT NULL, shuning uchun 'optional' olib tashlandi

  @ApiPropertyOptional({
    example: 8,
    description: "Foydalanuvchining yetkazib berish manzili ID (ixtiyoriy)",
  })
  @IsOptional()
  @IsNumber()
  delivery_address_id?: number;
}
