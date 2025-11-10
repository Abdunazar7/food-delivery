import { ApiPropertyOptional } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";
import { CreateReviewDto } from "./create-review.dto";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiPropertyOptional({ example: 4, description: "Updated rating (1–5)" })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    example: "Yetkazib berish biroz kechikdi 🚴‍♂️",
    description: "Updated comment",
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
