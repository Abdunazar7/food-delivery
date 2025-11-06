import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemCategory } from "./entities/item_category.entity";
import { MenuCategory } from "../menu_category/entities/menu_category.entity";
import { MenuItem } from "../menu-items/entities/menu-item.entity";
import { CreateItemCategoryDto } from "./dto/create-item_category.dto";
import { UpdateItemCategoryDto } from "./dto/update-item_category.dto";

@Injectable()
export class ItemCategoryService {
  constructor(
    @InjectRepository(ItemCategory)
    private itemCategoryRepo: Repository<ItemCategory>,
    @InjectRepository(MenuItem)
    private menuItemRepo: Repository<MenuItem>,
    @InjectRepository(MenuCategory)
    private menuCategoryRepo: Repository<MenuCategory>
  ) {}

  async create(dto: CreateItemCategoryDto): Promise<ItemCategory> {
    const menuItem = await this.menuItemRepo.findOne({
      where: { id: dto.menu_item_id },
    });
    if (!menuItem)
      throw new NotFoundException(
        `MenuItem with id ${dto.menu_item_id} not found`
      );

    const menuCategory = await this.menuCategoryRepo.findOne({
      where: { id: dto.category_id },
    });
    if (!menuCategory)
      throw new NotFoundException(
        `MenuCategory with id ${dto.category_id} not found`
      );

    const itemCategory = this.itemCategoryRepo.create({
      menu_item: menuItem,
      menu_category: menuCategory,
    });
    return this.itemCategoryRepo.save(itemCategory);
  }

  findAll(): Promise<ItemCategory[]> {
    return this.itemCategoryRepo.find({
      relations: ["menu_item", "menu_category"],
    });
  }

  async findOne(id: number): Promise<ItemCategory> {
    const itemCategory = await this.itemCategoryRepo.findOne({
      where: { id },
      relations: ["menu_item", "menu_category"],
    });
    if (!itemCategory)
      throw new NotFoundException(`ItemCategory with id ${id} not found`);
    return itemCategory;
  }

  async update(id: number, dto: UpdateItemCategoryDto): Promise<ItemCategory> {
    const itemCategory = await this.findOne(id);

    if (dto.menu_item_id) {
      const menuItem = await this.menuItemRepo.findOne({
        where: { id: dto.menu_item_id },
      });
      if (!menuItem)
        throw new NotFoundException(
          `MenuItem with id ${dto.menu_item_id} not found`
        );
      itemCategory.menu_item = menuItem;
    }

    if (dto.category_id) {
      const menuCategory = await this.menuCategoryRepo.findOne({
        where: { id: dto.category_id },
      });
      if (!menuCategory)
        throw new NotFoundException(
          `MenuCategory with id ${dto.category_id} not found`
        );
      itemCategory.menu_category = menuCategory;
    }

    return this.itemCategoryRepo.save(itemCategory);
  }

  async remove(id: number): Promise<void> {
    const itemCategory = await this.findOne(id);
    await this.itemCategoryRepo.remove(itemCategory);
  }
}
