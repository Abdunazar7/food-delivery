import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MenuCategory } from "./entities/menu_category.entity";
import { CreateMenuCategoryDto } from "./dto/create-menu_category.dto";
import { UpdateMenuCategoryDto } from "./dto/update-menu_category.dto";

@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectRepository(MenuCategory)
    private categoryRepo: Repository<MenuCategory>
  ) {}

  create(dto: CreateMenuCategoryDto): Promise<MenuCategory> {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  findAll(): Promise<MenuCategory[]> {
    return this.categoryRepo.find();
  }

  async findOne(id: number): Promise<MenuCategory> {
    const category = await this.categoryRepo.findOne({ where: { id }});
    if (!category)
      throw new NotFoundException(`MenuCategory with id ${id} not found`);
    return category;
  }

  async update(id: number, dto: UpdateMenuCategoryDto): Promise<MenuCategory> {
    const category = await this.findOne(id);
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepo.remove(category);
  }
}
