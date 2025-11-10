import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VendorCategory } from "../../vendor_category/entities/vendor_category.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon_url: string;

  @OneToMany(() => VendorCategory, (vc) => vc.category)
  vendorCategories: VendorCategory[];
}
