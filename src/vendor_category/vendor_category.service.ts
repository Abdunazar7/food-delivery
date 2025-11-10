import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VendorCategory } from "./entities/vendor_category.entity";
import { CreateVendorCategoryDto } from "./dto/create-vendor_category.dto";
import { UpdateVendorCategoryDto } from "./dto/update-vendor_category.dto";

@Injectable()
export class VendorCategoryService {
  constructor(
    @InjectRepository(VendorCategory)
    private readonly vendorCategoryRepo: Repository<VendorCategory>
  ) {}

  create(dto: CreateVendorCategoryDto) {
    const record = this.vendorCategoryRepo.create(dto as any);
    return this.vendorCategoryRepo.save(record);
  }

  findAll() {
    return this.vendorCategoryRepo.find({ relations: ["vendor", "category"] });
  }

  async findOne(id: number) {
    const record = await this.vendorCategoryRepo.findOne({
      where: { id },
      relations: ["vendor", "category"],
    });
    if (!record) throw new NotFoundException("VendorCategory not found");
    return record;
  }

  async update(id: number, dto: UpdateVendorCategoryDto) {
    await this.findOne(id);
    await this.vendorCategoryRepo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.vendorCategoryRepo.delete(id);
  }
}
