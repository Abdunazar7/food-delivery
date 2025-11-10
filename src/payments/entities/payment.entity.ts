import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "../../orders/entities/order.entity";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  amount: number;

  @Column({ type: "varchar", nullable: true })
  currency: string; // UZS, USD, RUB

  @Column({ type: "varchar", nullable: true, default: "cash" })
  method: string; // card, cash

  @Column({ type: "varchar", nullable: true })
  provider: string;

  @Column({ type: "varchar" })
  status: string; // pending, success, failed

  @Column({ type: "timestamp" })
  paid_at: Date;
}
