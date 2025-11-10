import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { District } from "../../districts/entities/district.entity";
import { Order } from "../../orders/entities/order.entity";

@Entity("user_addresses")
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "text", nullable: true })
  address: string;

  @Column({ type: "decimal", precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: "decimal", precision: 10, scale: 6, nullable: true })
  longitude: number;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: "user_id" })
  user: User;

  // user_address.entity.ts
  @ManyToOne(() => District, (district) => district.userAddresses)
  @JoinColumn({ name: "district_id" })
  district: District;

  @OneToMany(() => Order, (order) => order.deliveryAddress)
  orders: Order[];
}
