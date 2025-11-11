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
import { VendorAddressesService } from "./vendor_addresses.service";
import { VendorAddress } from "./entities/vendor_address.entity";
import { CreateVendorAddressDto } from "./dto/create-vendor_address.dto";
import { UpdateVendorAddressDto } from "./dto/update-vendor_address.dto";
import { AccessTokenGuard } from "../common/guards";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles, UserRole } from "../app.constants";

@ApiTags("Vendor Addresses")
@Controller("vendor-addresses")
export class VendorAddressesController {
  constructor(private readonly addressesService: VendorAddressesService) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @Post()
  @ApiOperation({ summary: "Create a new vendor address" })
  @ApiResponse({ status: 201, type: VendorAddress })
  create(@Body() dto: CreateVendorAddressDto) {
    return this.addressesService.create(dto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: "Get all vendor addresses" })
  @ApiResponse({ status: 200, type: [VendorAddress] })
  findAll() {
    return this.addressesService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get vendor address by id" })
  @ApiResponse({ status: 200, type: VendorAddress })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.addressesService.findOne(id);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(":id")
  @ApiOperation({ summary: "Update vendor address" })
  @ApiResponse({ status: 200, type: VendorAddress })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateVendorAddressDto
  ) {
    return this.addressesService.update(id, dto);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete vendor address" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.addressesService.remove(id);
  }
}
