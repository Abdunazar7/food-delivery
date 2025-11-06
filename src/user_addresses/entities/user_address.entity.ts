import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { District } from "../../districts/entities/district.entity";

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

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => District, (district) => district.user_addresses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "district_id" })
  district: District;
}
