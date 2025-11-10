import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Courier } from "./entities/courier.entity";
import { CreateCourierDto } from "./dto/create-courier.dto";
import { UpdateCourierDto } from "./dto/update-courier.dto";

@Injectable()
export class CouriersService {
  constructor(
    @InjectRepository(Courier
    )
    private readonly courierRepo: Repository<Courier>
  ) {}

  async create(dto: CreateCourierDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 7);

    const courier = this.courierRepo.create({
      full_name: dto.full_name,
      phone: dto.phone,
      email: dto.email,
      password_hash: hashedPassword,
      vehicle_type: dto.vehicle_type,
      license_number: dto.license_number,
      refreshToken_hash: "", // token keyin generate bo'ladi
    });

    return this.courierRepo.save(courier);
  }

  findAll() {
    return this.courierRepo.find({
      relations: ["orders", "assignments", "reviews"],
    });
  }

  async findOne(id: number) {
    const courier = await this.courierRepo.findOne({
      where: { id },
      relations: ["orders", "assignments", "reviews"],
    });
    if (!courier) throw new NotFoundException("Courier not found");
    return courier;
  }

  async update(id: number, dto: UpdateCourierDto) {
    await this.findOne(id);

    if (dto.password) {
      dto["password_hash"] = await bcrypt.hash(dto.password, 7);
      delete dto.password;
    }

    await this.courierRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const courier = await this.findOne(id);
        if (!courier) {
          throw new NotFoundException(`Courier with id ${id} not found`);
        }

    await this.courierRepo.delete(id);
    return id
  }
}
