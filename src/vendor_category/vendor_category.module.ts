import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VendorCategoryService } from "./vendor_category.service";
import { VendorCategoryController } from "./vendor_category.controller";
import { VendorCategory } from "./entities/vendor_category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VendorCategory])],
  controllers: [VendorCategoryController],
  providers: [VendorCategoryService],
})
export class VendorCategoryModule {}
