import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";
import { Roles, UserRole } from "../app.constants";
import { User } from "../users/entities/user.entity";
import { AccessTokenGuard } from "../common/guards";
import { RolesGuard } from "../common/guards/roles.guard";
import { CreatorGuard } from "../common/guards/creator.guard";

@ApiTags("Admins")
@Controller("admins")
@UseGuards(AccessTokenGuard, RolesGuard)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  // @Roles(UserRole.ADMIN)
  // @UseGuards(CreatorGuard)
  @Post()
  @ApiOperation({ summary: "Create a new admin" })
  @ApiResponse({ status: 201, type: Admin })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({ status: 200, type: [Admin] })
  findAll() {
    return this.adminsService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @Get(":id")
  @ApiOperation({ summary: "Get admin by id" })
  @ApiResponse({ status: 200, type: Admin })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.adminsService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(":id")
  @ApiOperation({ summary: "Update admin" })
  @ApiResponse({ status: 200, type: Admin })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(CreatorGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete admin" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.adminsService.remove(id);
  }
}
