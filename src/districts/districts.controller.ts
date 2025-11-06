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
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DistrictsService } from "./districts.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { District } from "./entities/district.entity";

@ApiTags("Districts")
@Controller("districts")
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new district" })
  @ApiResponse({ status: 201, type: District })
  create(@Body() dto: CreateDistrictDto) {
    return this.districtsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all districts" })
  @ApiResponse({ status: 200, type: [District] })
  findAll() {
    return this.districtsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get district by id" })
  @ApiResponse({ status: 200, type: District })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.districtsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update district" })
  @ApiResponse({ status: 200, type: District })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateDistrictDto
  ) {
    return this.districtsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete district" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.districtsService.remove(id);
  }
}
