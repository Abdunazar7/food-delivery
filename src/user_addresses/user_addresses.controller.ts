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
import { UserAddressesService } from "./user_addresses.service";
import { CreateUserAddressDto } from "./dto/create-user_address.dto";
import { UpdateUserAddressDto } from "./dto/update-user_address.dto";
import { UserAddress } from "./entities/user_address.entity";

@ApiTags("User Addresses")
@Controller("user-addresses")
export class UserAddressesController {
  constructor(private readonly addressesService: UserAddressesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user address" })
  @ApiResponse({ status: 201, type: UserAddress })
  create(@Body() dto: CreateUserAddressDto) {
    return this.addressesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all user addresses" })
  @ApiResponse({ status: 200, type: [UserAddress] })
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user address by id" })
  @ApiResponse({ status: 200, type: UserAddress })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.addressesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user address" })
  @ApiResponse({ status: 200, type: UserAddress })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserAddressDto
  ) {
    return this.addressesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user address" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.addressesService.remove(id);
  }
}
