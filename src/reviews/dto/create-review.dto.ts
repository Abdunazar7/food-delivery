import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: "User ID (FK to users table)" })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 45, description: "Order ID (FK to orders table)" })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    example: "vendor",
    enum: ["vendor", "courier"],
    description: "Review target type",
  })
  @IsEnum(["vendor", "courier"])
  targetType: "vendor" | "courier";

  @ApiProperty({ example: 12, description: "Target ID (Vendor or Courier ID)" })
  @IsNumber()
  targetId: number;

  @ApiProperty({ example: 5, description: "Rating from 1 to 5" })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({
    example: "Yemak juda mazali edi 🍲",
    description: "Optional review comment",
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
