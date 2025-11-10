import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Vendor } from "../../vendors/entities/vendor.entity";
import { Category } from "../../categories/entities/category.entity";

@Entity("vendor_category")
export class VendorCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.vendorCategories)
  @JoinColumn({ name: "vendorId" })
  vendor: Vendor;

  @ManyToOne(() => Category, (category) => category.vendorCategories)
  @JoinColumn({ name: "categoryId" })
  category: Category;
}
