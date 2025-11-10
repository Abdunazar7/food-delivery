import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Vendor } from "./entities/vendor.entity";
import { CreateVendorDto } from "./dto/create-vendor.dto";
import { UpdateVendorDto } from "./dto/update-vendor.dto";

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>
  ) {}

  async create(dto: CreateVendorDto): Promise<Vendor> {
    const {
      name,
      owner_email,
      owner_phone,
      password,
      is_active,
      description,
      logo_url,
    } = dto;

    if (!password) {
      throw new BadRequestException("password is required");
    }

    const passwordHash = await bcrypt.hash(dto.password, 7);

    const vendor = this.vendorRepo.create({
      name,
      owner_email,
      owner_phone,
      password_hash: password,
      is_active,
      description,
      logo_url,
    });

    return this.vendorRepo.save(vendor);
  }

  findAll(): Promise<Vendor[]> {
    return this.vendorRepo.find({
      relations: ["addresses", "menuItems", "categories", "orders", "reviews"],
    });
  }

  async findOne(id: number): Promise<Vendor> {
    const vendor = await this.vendorRepo.findOne({
      where: { id },
      relations: ["addresses", "menuItems", "categories", "orders", "reviews"],
    });
    if (!vendor) throw new NotFoundException(`Vendor with id ${id} not found`);
    return vendor;
  }

  async update(id: number, dto: UpdateVendorDto): Promise<Vendor> {
    const vendor = await this.findOne(id);

    if (dto.password) {
      if (dto.password) {
        throw new BadRequestException("Passwords is required");
      }
      vendor.password_hash = await bcrypt.hash(dto.password, 7);
    }

    Object.assign(vendor, dto);
    return this.vendorRepo.save(vendor);
  }

  async remove(id: number): Promise<number> {
    const vendor = await this.findOne(id);
    if (!vendor) {
      throw new NotFoundException(`Vendor with id ${id} not found`);
    }
    const Id = vendor.id
    await this.vendorRepo.remove(vendor);
    return id
  }
}
