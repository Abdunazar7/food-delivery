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
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { RolesGuard } from "../common/guards/roles.guard";
import { AccessTokenGuard } from "../common/guards";
import { Roles, UserRole } from "../app.constants";
import { SelfGuard } from "../common/guards/self.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Activate user by email link" })
  @ApiResponse({ status: 200, description: "User activated successfully" })
  @Get("activate/:link")
  @HttpCode(200)
  activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
  }

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created", type: User })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of users", type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard, SelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({ status: 200, description: "User details", type: User })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard, SelfGuard)
  @Put(":id")
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200, description: "Updated user", type: User })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard, SelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 204, description: "User deleted" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
