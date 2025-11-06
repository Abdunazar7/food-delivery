import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Vendor } from "../../vendors/entities/vendor.entity";

@Entity("menu_items")
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.menu_items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "vendor_id" })
  vendor: Vendor;

  @Column({ nullable: true })
  category_name: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ type: "enum"})
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
}
