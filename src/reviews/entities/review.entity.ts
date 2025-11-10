import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Order } from "../../orders/entities/order.entity";
import { Vendor } from "../../vendors/entities/vendor.entity";
import { Courier } from "../../couriers/entities/courier.entity";

@Entity({ name: "reviews" })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "target_type", type: "varchar", length: 10 })
  targetType: "vendor" | "courier";

  @Column({ name: "target_id" })
  targetId: number;

  @Column({ type: "smallint" })
  rating: number;

  @Column({ type: "text", nullable: true })
  comment?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Order, (order) => order.reviews)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => Vendor, (vendor) => vendor.reviews, { nullable: true })
  @JoinColumn({ name: "vendor_id" })
  vendor?: Vendor;

  @ManyToOne(() => Courier, (courier) => courier.reviews, { nullable: true })
  @JoinColumn({ name: "courier_id" })
  courier?: Courier;
}

