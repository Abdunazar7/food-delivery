import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { VendorCategoryService } from "./vendor_category.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateVendorCategoryDto } from "./dto/create-vendor_category.dto";
import { UpdateVendorCategoryDto } from "./dto/update-vendor_category.dto";

@ApiTags("Vendor_Category")
@Controller("vendor-category")
export class VendorCategoryController {
  constructor(private readonly vendorCategoryService: VendorCategoryService) {}

  @Post()
  create(@Body() dto: CreateVendorCategoryDto) {
    return this.vendorCategoryService.create(dto);
  }

  @Get()
  findAll() {
    return this.vendorCategoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.vendorCategoryService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateVendorCategoryDto) {
    return this.vendorCategoryService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.vendorCategoryService.remove(+id);
  }
}
