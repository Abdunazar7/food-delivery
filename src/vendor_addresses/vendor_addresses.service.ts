import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VendorAddress } from "./entities/vendor_address.entity";
import { Vendor } from "../vendors/entities/vendor.entity";
import { District } from "../districts/entities/district.entity";
import { CreateVendorAddressDto } from "./dto/create-vendor_address.dto";
import { UpdateVendorAddressDto } from "./dto/update-vendor_address.dto";

@Injectable()
export class VendorAddressesService {
  constructor(
    @InjectRepository(VendorAddress)
    private addressRepo: Repository<VendorAddress>,

    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,

    @InjectRepository(District)
    private districtRepo: Repository<District>
  ) {}

  async create(dto: CreateVendorAddressDto): Promise<VendorAddress> {
    const vendor = await this.vendorRepo.findOne({
      where: { id: dto.vendor_id },
    });
    if (!vendor)
      throw new NotFoundException(`Vendor with id ${dto.vendor_id} not found`);

    const district = await this.districtRepo.findOne({
      where: { id: dto.district_id },
    });
    if (!district)
      throw new NotFoundException(
        `District with id ${dto.district_id} not found`
      );

    const address = this.addressRepo.create({
      ...dto,
      vendor,
      district,
    });

    return this.addressRepo.save(address);
  }

  findAll(): Promise<VendorAddress[]> {
    return this.addressRepo.find({ relations: ["vendor", "district"] });
  }

  async findOne(id: number): Promise<VendorAddress> {
    const address = await this.addressRepo.findOne({
      where: { id },
      relations: ["vendor", "district"],
    });
    if (!address)
      throw new NotFoundException(`VendorAddress with id ${id} not found`);
    return address;
  }

  async update(
    id: number,
    dto: UpdateVendorAddressDto
  ): Promise<VendorAddress> {
    const address = await this.findOne(id);

    if (dto.vendor_id) {
      const vendor = await this.vendorRepo.findOne({
        where: { id: dto.vendor_id },
      });
      if (!vendor)
        throw new NotFoundException(
          `Vendor with id ${dto.vendor_id} not found`
        );
      address.vendor = vendor;
    }

    if (dto.district_id) {
      const district = await this.districtRepo.findOne({
        where: { id: dto.district_id },
      });
      if (!district)
        throw new NotFoundException(
          `District with id ${dto.district_id} not found`
        );
      address.district = district;
    }

    Object.assign(address, dto);

    return this.addressRepo.save(address);
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepo.remove(address);
  }
}
