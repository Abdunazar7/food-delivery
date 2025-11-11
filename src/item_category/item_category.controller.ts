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
import { ItemCategoryService } from "./item_category.service";
import { ItemCategory } from "./entities/item_category.entity";
import { CreateItemCategoryDto } from "./dto/create-item_category.dto";
import { UpdateItemCategoryDto } from "./dto/update-item_category.dto";
import { RolesGuard } from "../common/guards/roles.guard";
import { AccessTokenGuard } from "../common/guards";
import { Roles, UserRole } from "../app.constants";

@ApiTags("Item Categories")
@Controller("item-categories")
export class ItemCategoryController {
  constructor(private readonly itemCategoryService: ItemCategoryService) {}

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: "Create a new item category" })
  @ApiResponse({ status: 201, type: ItemCategory })
  create(@Body() dto: CreateItemCategoryDto) {
    return this.itemCategoryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all item categories" })
  @ApiResponse({ status: 200, type: [ItemCategory] })
  findAll() {
    return this.itemCategoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get item category by id" })
  @ApiResponse({ status: 200, type: ItemCategory })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.itemCategoryService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update item category" })
  @ApiResponse({ status: 200, type: ItemCategory })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateItemCategoryDto
  ) {
    return this.itemCategoryService.update(id, dto);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete item category" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.itemCategoryService.remove(id);
  }
}
