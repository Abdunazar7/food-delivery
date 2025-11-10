import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Region } from "../../regions/entities/region.entity";
import { UserAddress } from "../../user_addresses/entities/user_address.entity";
import { VendorAddress } from "../../vendor_addresses/entities/vendor_address.entity";

@Entity("districts")
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Region, (region) => region.districts)
  @JoinColumn({ name: "region_id" })
  region: Region;

  @OneToMany(() => UserAddress, (address) => address.district)
  userAddresses: UserAddress[];

  @OneToMany(() => VendorAddress, (va) => va.district)
  vendorAddresses: VendorAddress[];
}
