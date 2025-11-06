import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Region } from "./entities/region.entity";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepo: Repository<Region>
  ) {}

  create(dto: CreateRegionDto): Promise<Region> {
    const region = this.regionRepo.create(dto);
    return this.regionRepo.save(region);
  }

  findAll(): Promise<Region[]> {
    return this.regionRepo.find({ relations: ["districts"] });
  }

  async findOne(id: number): Promise<Region> {
    const region = await this.regionRepo.findOne({
      where: { id },
      relations: ["districts"],
    });
    if (!region) throw new NotFoundException(`Region with id ${id} not found`);
    return region;
  }

  async update(id: number, dto: UpdateRegionDto): Promise<Region> {
    const region = await this.findOne(id);
    Object.assign(region, dto);
    return this.regionRepo.save(region);
  }

  async remove(id: number): Promise<void> {
    const region = await this.findOne(id);
    await this.regionRepo.remove(region);
  }
}
