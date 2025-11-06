import { PartialType } from "@nestjs/swagger";
import { CreateVendorAddressDto } from "./create-vendor_address.dto";

export class UpdateVendorAddressDto extends PartialType(
  CreateVendorAddressDto
) {}
