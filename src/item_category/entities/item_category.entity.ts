import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { MenuCategory } from "../../menu_category/entities/menu_category.entity";
import { MenuItem } from "../../menu-items/entities/menu-item.entity";

@Entity("item_category")
export class ItemCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.itemCategories)
  @JoinColumn({ name: "menu_item_id" })
  menuItem: MenuItem;

  @ManyToOne(() => MenuCategory, (menuCategory) => menuCategory.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "category_id" })
  menu_category: MenuCategory;
}
