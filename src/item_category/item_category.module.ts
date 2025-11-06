import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemCategoryService } from "./item_category.service";
import { ItemCategoryController } from "./item_category.controller";
import { ItemCategory } from "./entities/item_category.entity";
import { MenuCategory } from "../menu_category/entities/menu_category.entity";
import { MenuItem } from "../menu-items/entities/menu-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ItemCategory, MenuItem, MenuCategory])],
  controllers: [ItemCategoryController],
  providers: [ItemCategoryService],
  exports: [ItemCategoryService],
})
export class ItemCategoryModule {}
