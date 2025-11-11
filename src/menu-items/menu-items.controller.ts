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
import { MenuItemsService } from "./menu-items.service";
import { MenuItem } from "./entities/menu-item.entity";
import { CreateMenuItemDto } from "./dto/create-menu-item.dto";
import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";
import { RolesGuard } from "../common/guards/roles.guard";
import { AccessTokenGuard } from "../common/guards";
import { Roles, UserRole } from "../app.constants";

@ApiTags("Menu Items")
@Controller("menu-items")
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: "Create a new menu item" })
  @ApiResponse({ status: 201, type: MenuItem })
  create(@Body() dto: CreateMenuItemDto) {
    return this.menuItemsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all menu items" })
  @ApiResponse({ status: 200, type: [MenuItem] })
  findAll() {
    return this.menuItemsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get menu item by id" })
  @ApiResponse({ status: 200, type: MenuItem })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.menuItemsService.findOne(id);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(":id")
  @ApiOperation({ summary: "Update menu item" })
  @ApiResponse({ status: 200, type: MenuItem })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateMenuItemDto
  ) {
    return this.menuItemsService.update(id, dto);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete menu item" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.menuItemsService.remove(id);
  }
}
