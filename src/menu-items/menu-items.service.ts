import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vendor } from "../vendors/entities/vendor.entity";
import { MenuItem } from "./entities/menu-item.entity";
import { CreateMenuItemDto } from "./dto/create-menu-item.dto";
import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepo: Repository<MenuItem>,
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>
  ) {}

  async create(dto: CreateMenuItemDto): Promise<MenuItem> {
    const vendor = await this.vendorRepo.findOne({
      where: { id: dto.vendor_id },
    });
    if (!vendor)
      throw new NotFoundException(`Vendor with id ${dto.vendor_id} not found`);

    const menuItem = this.menuItemRepo.create({ ...dto, vendor });
    return this.menuItemRepo.save(menuItem);
  }

  findAll(): Promise<MenuItem[]> {
    return this.menuItemRepo.find({
      relations: ["vendor", "orderItems", "itemCategories"],
    });
  }

  async findOne(id: number): Promise<MenuItem> {
    const menuItem = await this.menuItemRepo.findOne({
      where: { id },
      relations: ["vendor", "orderItems", "itemCategories"],
    });
    if (!menuItem)
      throw new NotFoundException(`MenuItem with id ${id} not found`);
    return menuItem;
  }

  async update(id: number, dto: UpdateMenuItemDto): Promise<MenuItem> {
    const menuItem = await this.findOne(id);

    if (dto.vendor_id) {
      const vendor = await this.vendorRepo.findOne({
        where: { id: dto.vendor_id },
      });
      if (!vendor)
        throw new NotFoundException(
          `Vendor with id ${dto.vendor_id} not found`
        );
      menuItem.vendor = vendor;
    }

    Object.assign(menuItem, dto);
    return this.menuItemRepo.save(menuItem);
  }

  async remove(id: number): Promise<void> {
    const menuItem = await this.findOne(id);
    await this.menuItemRepo.remove(menuItem);
  }
}
