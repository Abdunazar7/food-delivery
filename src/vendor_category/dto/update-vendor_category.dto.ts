import { PartialType } from "@nestjs/swagger";
import { CreateVendorCategoryDto } from "./create-vendor_category.dto";

export class UpdateVendorCategoryDto extends PartialType(CreateVendorCategoryDto) {
  vendor?: number;
  category?: number;
}
