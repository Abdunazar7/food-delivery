import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order.entity";
import { CourierAssignment } from "../../courier_assignments/entities/courier_assignment.entity";
import { Review } from "../../reviews/entities/review.entity";

@Entity("couriers")
export class Courier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  full_name: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password_hash: string;

  @Column({ nullable: true })
  vehicle_type: string; // bike | car | motorbike

  @Column({ nullable: true })
  license_number: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: "decimal", precision: 2, scale: 1, nullable: true })
  rating_avg: number;

  @Column({ nullable: true })
  total_deliveries: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column()
  refreshToken_hash: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToMany(() => Order, (order) => order.courier)
  orders: Order[];

  @OneToMany(() => CourierAssignment, (ca) => ca.courier)
  assignments: CourierAssignment[];

  @OneToMany(() => Review, (review) => review.courier)
  reviews: Review[];
}
