import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Put,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RegionsService } from "./regions.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./entities/region.entity";
import { Roles, UserRole } from "../app.constants";
import { AccessTokenGuard } from "../common/guards";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("Regions")
@Controller("regions")
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: "Create a new region" })
  @ApiResponse({ status: 201, type: Region })
  create(@Body() dto: CreateRegionDto) {
    return this.regionsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all regions" })
  @ApiResponse({ status: 200, type: [Region] })
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get region by id" })
  @ApiResponse({ status: 200, type: Region })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.regionsService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(":id")
  @ApiOperation({ summary: "Update region" })
  @ApiResponse({ status: 200, type: Region })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateRegionDto) {
    return this.regionsService.update(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete region" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.regionsService.remove(id);
  }
}
