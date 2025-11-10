import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Vendor } from "../../vendors/entities/vendor.entity";
import { OrderItem } from "../../order_items/entities/order_item.entity";
import { ItemCategory } from "../../item_category/entities/item_category.entity";

@Entity("menu_items")
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ type: "varchar" })
  size: string;

  @Column()
  features: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ nullable: true })
  calories: number;

  @Column({ type: "text", nullable: true })
  image_url: string;

  @Column({ default: true })
  is_available: boolean;

  @Column({ nullable: true })
  preparation_time_minutes: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.menuItems)
  @JoinColumn({ name: "vendor_id" })
  vendor: Vendor;

  @OneToMany(() => OrderItem, (oi) => oi.menuItem)
  orderItems: OrderItem[];

  @OneToMany(() => ItemCategory, (ic) => ic.menuItem)
  itemCategories: ItemCategory[];
}
