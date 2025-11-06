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
import { VendorAddressesService } from "./vendor_addresses.service";
import { VendorAddress } from "./entities/vendor_address.entity";
import { CreateVendorAddressDto } from "./dto/create-vendor_address.dto";
import { UpdateVendorAddressDto } from "./dto/update-vendor_address.dto";

@ApiTags("Vendor Addresses")
@Controller("vendor-addresses")
export class VendorAddressesController {
  constructor(private readonly addressesService: VendorAddressesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new vendor address" })
  @ApiResponse({ status: 201, type: VendorAddress })
  create(@Body() dto: CreateVendorAddressDto) {
    return this.addressesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all vendor addresses" })
  @ApiResponse({ status: 200, type: [VendorAddress] })
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get vendor address by id" })
  @ApiResponse({ status: 200, type: VendorAddress })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.addressesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update vendor address" })
  @ApiResponse({ status: 200, type: VendorAddress })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateVendorAddressDto
  ) {
    return this.addressesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete vendor address" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.addressesService.remove(id);
  }
}
