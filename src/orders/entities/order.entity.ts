import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Vendor } from "../../vendors/entities/vendor.entity";
import { Courier } from "../../couriers/entities/courier.entity";
import { OrderItem } from "../../order_items/entities/order_item.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { Review } from "../../reviews/entities/review.entity";
import { CourierAssignment } from "../../courier_assignments/entities/courier_assignment.entity";
import { VendorAddress } from "../../vendor_addresses/entities/vendor_address.entity";
import { UserAddress } from "../../user_addresses/entities/user_address.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 15,
    default: "pending",
  })
  status: string;

  @Column({
    type: "varchar",
    length: 10,
    default: "unpaid",
  })
  payment_status: "unpaid" | "paid" | "refunded";

  // DDL'da total_amount, lekin DTO va Service'da total_price.
  // Agar DDL'ga moslash kerak bo'lsa, @Column({ name: 'total_amount' }) qo'shing.
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  total_price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  delivery_fee: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  tip_amount: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ type: "timestamp", nullable: true })
  delivered_at: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Vendor, (vendor) => vendor.orders)
  @JoinColumn({ name: "vendor_id" })
  vendor: Vendor;

  @ManyToOne(() => Courier, (courier) => courier.orders, { nullable: true })
  @JoinColumn({ name: "courier_id" })
  courier: Courier;

  // Xatolikni tuzatish: Servis 'vendorAddress' deb murojaat qilgan.
  @ManyToOne(() => VendorAddress, (va) => va.orders)
  @JoinColumn({ name: "vendor_address_id" })
  vendorAddress: VendorAddress; // 'vendor_address' -> 'vendorAddress'

  // Xatolikni tuzatish: Servis 'deliveryAddress' deb murojaat qilgan.
  @ManyToOne(() => UserAddress, (ua) => ua.orders, { nullable: true })
  @JoinColumn({ name: "delivery_address_id" })
  deliveryAddress: UserAddress; // 'delivery_address' -> 'deliveryAddress'

  @OneToMany(() => OrderItem, (oi) => oi.order)
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (p) => p.order)
  payments: Payment[];

  @OneToMany(() => Review, (r) => r.order)
  reviews: Review[];

  @OneToMany(() => CourierAssignment, (ca) => ca.order)
  assignments: CourierAssignment[];
}
