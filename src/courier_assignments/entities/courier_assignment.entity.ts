import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Courier } from "../../couriers/entities/courier.entity";
import { Order } from "../../orders/entities/order.entity";

@Entity("courier_assignments")
export class CourierAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Courier, (courier) => courier.assignments)
  @JoinColumn({ name: "courier_id" })
  courier: Courier;

  @ManyToOne(() => Order, (order) => order.assignments)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({ type: "timestamp", nullable: true })
  assigned_at: Date;

  @Column({ type: "timestamp", nullable: true })
  accepted_at: Date;

  @Column({ type: "timestamp", nullable: true })
  picked_up_at: Date;

  @Column({ type: "timestamp", nullable: true })
  delivered_at: Date;

  @Column({
    type: "varchar",
    nullable: true,
  })
  status: string; // assigned | accepted | picked_up | delivered | canceled
}
