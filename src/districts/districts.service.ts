import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { District } from "./entities/district.entity";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { Region } from "../regions/entities/region.entity";

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtRepo: Repository<District>,

    @InjectRepository(Region)
    private regionRepo: Repository<Region>
  ) {}

  async create(dto: CreateDistrictDto): Promise<District> {
    const region = await this.regionRepo.findOne({
      where: { id: dto.region_id },
    });
    if (!region)
      throw new NotFoundException(`Region with id ${dto.region_id} not found`);

    const district = this.districtRepo.create({
      name: dto.name,
      region,
    });

    return this.districtRepo.save(district);
  }

  findAll(): Promise<District[]> {
    return this.districtRepo.find({
      relations: ["region", "userAddresses", "vendorAddresses"],
    });
  }

  async findOne(id: number): Promise<District> {
    const district = await this.districtRepo.findOne({
      where: { id },
      relations: ["region", "userAddresses", "vendorAddresses"],
    });
    if (!district)
      throw new NotFoundException(`District with id ${id} not found`);
    return district;
  }

  async update(id: number, dto: UpdateDistrictDto): Promise<District> {
    const district = await this.findOne(id);

    if (dto.region_id) {
      const region = await this.regionRepo.findOne({
        where: { id: dto.region_id },
      });
      if (!region)
        throw new NotFoundException(
          `Region with id ${dto.region_id} not found`
        );
      district.region = region;
    }

    if (dto.name) district.name = dto.name;

    return this.districtRepo.save(district);
  }

  async remove(id: number): Promise<void> {
    const district = await this.findOne(id);
    await this.districtRepo.remove(district);
  }
}
