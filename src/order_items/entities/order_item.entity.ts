import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "../../orders/entities/order.entity";
import { MenuItem } from "../../menu-items/entities/menu-item.entity";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.orderItems)
  @JoinColumn({ name: "menu_item_id" })
  menuItem: MenuItem;

  @Column({ type: "int", nullable: true })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  unit_price: number;

  @Column({ type: "text", nullable: false })
  notes: string;
}
