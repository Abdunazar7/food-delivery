import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { VendorAddress } from "../../vendor_addresses/entities/vendor_address.entity";
import { MenuItem } from "../../menu-items/entities/menu-item.entity";
// import { VendorCategory } from "../../vendor_category/entities/vendor_category.entity";

@Entity("vendors")
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  admin_approved: boolean;

  @Column()
  name: string;

  @Column({ nullable: true })
  owner_email: string;

  @Column({ nullable: true })
  owner_phone: string;

  @Column({ nullable: true })
  password_hash: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ nullable: true, type: "text" })
  logo_url: string;

  @Column({ type: "decimal", precision: 2, scale: 1, nullable: true })
  rating_avg: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @OneToMany(() => VendorAddress, (address) => address.vendor)
  addresses: VendorAddress[];

  // @OneToMany(() => VendorCategory, (vc) => vc.vendor)
  // categories: VendorCategory[];

  @OneToMany(() => MenuItem, (item) => item.vendor)
  menu_items: MenuItem[];
}
