import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new review" })
  @ApiResponse({ status: 201, description: "Review successfully created." })
  @ApiBody({ type: CreateReviewDto })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all reviews" })
  @ApiResponse({ status: 200, description: "List of all reviews." })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get review by ID" })
  @ApiParam({ name: "id", example: 1, description: "Review ID" })
  @ApiResponse({ status: 200, description: "Review found." })
  @ApiResponse({ status: 404, description: "Review not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.reviewsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update review by ID" })
  @ApiParam({ name: "id", example: 1, description: "Review ID" })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({ status: 200, description: "Review successfully updated." })
  @ApiResponse({ status: 404, description: "Review not found." })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateReviewDto) {
    return this.reviewsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete review by ID" })
  @ApiParam({ name: "id", example: 1, description: "Review ID" })
  @ApiResponse({ status: 200, description: "Review successfully deleted." })
  @ApiResponse({ status: 404, description: "Review not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.reviewsService.remove(id);
  }

  @Get("target/:type/:targetId")
  @ApiOperation({
    summary: "Get all reviews by target (vendor or courier)",
    description: "Returns all reviews for a given target type and ID",
  })
  @ApiParam({ name: "type", enum: ["vendor", "courier"], example: "vendor" })
  @ApiParam({
    name: "targetId",
    example: 12,
    description: "Vendor or Courier ID",
  })
  @ApiResponse({
    status: 200,
    description: "List of reviews for given target.",
  })
  findByTarget(
    @Param("type") type: "vendor" | "courier",
    @Param("targetId", ParseIntPipe) targetId: number
  ) {
    return this.reviewsService.findByTarget(type, targetId);
  }
}
