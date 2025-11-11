import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserAddress } from "../../user_addresses/entities/user_address.entity";
import { Order } from "../../orders/entities/order.entity";
import { Review } from "../../reviews/entities/review.entity";
import { UUID } from "typeorm/browser/driver/mongodb/bson.typings.js";
// import { UserAddress } from "../../user_addresses/entities/user_address.entity";
// import { Order } from "../../orders/entities/order.entity";
// import { Review } from "../../reviews/entities/review.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column({})
  phone: string;

  @Column({})
  password_hash: string;

  @Column()
  refreshToken_hash: string;

  @Column({ nullable: false })
  activation_link: string;

  @Column({ default: false })
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

  @OneToMany(() => UserAddress, (address) => address.user)
  addresses: UserAddress[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
