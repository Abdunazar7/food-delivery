import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Vendor } from "../../vendors/entities/vendor.entity";
import { District } from "../../districts/entities/district.entity";

@Entity("vendor_addresses")
export class VendorAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  location: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ type: "int", nullable: true })
  delivery_radius_km: number;

  @Column({ type: "time", nullable: true })
  opening_time: string;

  @Column({ type: "time", nullable: true })
  closing_time: string;

  @Column({ default: true })
  is_open: boolean;

  @ManyToOne(() => Vendor, (vendor) => vendor.addresses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "vendor_id" })
  vendor: Vendor;

  @ManyToOne(() => District, (district) => district.vendor_addresses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "district_id" })
  district: District;
}
