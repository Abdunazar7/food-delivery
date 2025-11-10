import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  order_id: number;

  @ApiProperty({ example: 35000.5 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "UZS" })
  @IsString()
  currency: string;

  @ApiProperty({ example: "card" })
  @IsString()
  method: string;

  @ApiProperty({ example: "Payme" })
  @IsString()
  provider: string;

  @ApiProperty({ example: "pending" })
  @IsString()
  status: string;

  @ApiProperty({ example: "2025-01-10T12:30:00Z" })
  @IsString()
  paid_at: Date;
}
