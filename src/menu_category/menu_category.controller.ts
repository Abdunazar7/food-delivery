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
import { MenuCategoryService } from "./menu_category.service";
import { MenuCategory } from "./entities/menu_category.entity";
import { CreateMenuCategoryDto } from "./dto/create-menu_category.dto";
import { UpdateMenuCategoryDto } from "./dto/update-menu_category.dto";
import { Roles, UserRole } from "../app.constants";
import { AccessTokenGuard } from "../common/guards";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("Menu Categories")
@Controller("menu-categories")
export class MenuCategoryController {
  constructor(private readonly categoryService: MenuCategoryService) {}

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: "Create a new menu category" })
  @ApiResponse({ status: 201, type: MenuCategory })
  create(@Body() dto: CreateMenuCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all menu categories" })
  @ApiResponse({ status: 200, type: [MenuCategory] })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get menu category by id" })
  @ApiResponse({ status: 200, type: MenuCategory })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(":id")
  @ApiOperation({ summary: "Update menu category" })
  @ApiResponse({ status: 200, type: MenuCategory })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateMenuCategoryDto
  ) {
    return this.categoryService.update(id, dto);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete menu category" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
