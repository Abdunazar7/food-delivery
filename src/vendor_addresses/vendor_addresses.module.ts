import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VendorAddressesService } from "./vendor_addresses.service";
import { VendorAddressesController } from "./vendor_addresses.controller";
import { VendorAddress } from "./entities/vendor_address.entity";
import { Vendor } from "../vendors/entities/vendor.entity";
import { District } from "../districts/entities/district.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VendorAddress, Vendor, District])],
  controllers: [VendorAddressesController],
  providers: [VendorAddressesService],
  exports: [VendorAddressesService],
})
export class VendorAddressesModule {}
