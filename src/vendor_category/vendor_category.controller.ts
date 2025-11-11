import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { VendorCategoryService } from "./vendor_category.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateVendorCategoryDto } from "./dto/create-vendor_category.dto";
import { UpdateVendorCategoryDto } from "./dto/update-vendor_category.dto";
import { VendorCategory } from "./entities/vendor_category.entity";
import { Roles, UserRole } from "../app.constants";
import { AccessTokenGuard } from "../common/guards";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("Vendor_Category")
@Controller("vendor-category")
export class VendorCategoryController {
  constructor(private readonly vendorCategoryService: VendorCategoryService) {}

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({
    summary: "Create a new vendor-category link (Admin or Vendor only)",
  })
  @ApiResponse({ status: 201, type: VendorCategory })
  @Post()
  create(@Body() dto: CreateVendorCategoryDto) {
    return this.vendorCategoryService.create(dto);
  }

  @ApiOperation({
    summary: "Get all vendor-category links (Public)",
  })
  @ApiResponse({ status: 200, type: [VendorCategory] })
  @Get()
  findAll() {
    return this.vendorCategoryService.findAll();
  }

  @ApiOperation({ summary: "Get vendor-category link by id (Public)" })
  @ApiResponse({ status: 200, type: VendorCategory })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.vendorCategoryService.findOne(+id);
  }

  
  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateVendorCategoryDto) {
    return this.vendorCategoryService.update(+id, dto);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR) 
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({
    summary: "Delete vendor-category link (Admin or Self Vendor only)",
  })
  @ApiResponse({ status: 204 })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.vendorCategoryService.remove(+id);
  }
}
