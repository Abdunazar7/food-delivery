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
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserAddressesService } from "./user_addresses.service";
import { CreateUserAddressDto } from "./dto/create-user_address.dto";
import { UpdateUserAddressDto } from "./dto/update-user_address.dto";
import { UserAddress } from "./entities/user_address.entity";
import { AccessTokenGuard } from "../common/guards";
import { Roles, UserRole } from "../app.constants";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("User Addresses")
@Controller("user-addresses")
export class UserAddressesController {
  constructor(private readonly addressesService: UserAddressesService) {}

  @Roles(UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: "Create a new user address" })
  @ApiResponse({ status: 201, type: UserAddress })
  create(@Body() dto: CreateUserAddressDto) {
    return this.addressesService.create(dto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: "Get all user addresses" })
  @ApiResponse({ status: 200, type: [UserAddress] })
  findAll() {
    return this.addressesService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get user address by id" })
  @ApiResponse({ status: 200, type: UserAddress })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.addressesService.findOne(id);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update user address" })
  @ApiResponse({ status: 200, type: UserAddress })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserAddressDto
  ) {
    return this.addressesService.update(id, dto);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete user address" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.addressesService.remove(id);
  }
}
