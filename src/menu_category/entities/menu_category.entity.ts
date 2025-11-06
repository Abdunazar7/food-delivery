import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ItemCategory } from "../../item_category/entities/item_category.entity";

@Entity("menu_category")
export class MenuCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => ItemCategory, (itemCategory) => itemCategory.menu_category)
  item_categories: ItemCategory[];
}
