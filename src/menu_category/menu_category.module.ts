import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuCategoryService } from "./menu_category.service";
import { MenuCategoryController } from "./menu_category.controller";
import { MenuCategory } from "./entities/menu_category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory])],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService],
  exports: [MenuCategoryService],
})
export class MenuCategoryModule {}
