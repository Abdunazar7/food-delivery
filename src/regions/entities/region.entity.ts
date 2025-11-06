import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { District } from "../../districts/entities/district.entity";

@Entity("regions")
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => District, (district) => district.region)
  districts: District[];
}
