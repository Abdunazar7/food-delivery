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
import { VendorsService } from "./vendors.service";
import { Vendor } from "./entities/vendor.entity";
import { CreateVendorDto } from "./dto/create-vendor.dto";
import { UpdateVendorDto } from "./dto/update-vendor.dto";

@ApiTags("Vendors")
@Controller("vendors")
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new vendor" })
  @ApiResponse({ status: 201, type: Vendor })
  create(@Body() dto: CreateVendorDto) {
    return this.vendorsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all vendors" })
  @ApiResponse({ status: 200, type: [Vendor] })
  findAll() {
    return this.vendorsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get vendor by id" })
  @ApiResponse({ status: 200, type: Vendor })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.vendorsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update vendor" })
  @ApiResponse({ status: 200, type: Vendor })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateVendorDto) {
    return this.vendorsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete vendor" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.vendorsService.remove(id);
  }
}
