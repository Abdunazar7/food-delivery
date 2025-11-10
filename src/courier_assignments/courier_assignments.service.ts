import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CourierAssignment } from "./entities/courier_assignment.entity";
import { CreateCourierAssignmentDto } from "./dto/create-courier_assignment.dto";
import { UpdateCourierAssignmentDto } from "./dto/update-courier_assignment.dto";

@Injectable()
export class CourierAssignmentsService {
  constructor(
    @InjectRepository(CourierAssignment)
    private repo: Repository<CourierAssignment>
  ) {}

  create(dto: CreateCourierAssignmentDto) {
    const data = this.repo.create({
      status: dto.status,
      assigned_at: dto.assigned_at,
      accepted_at: dto.accepted_at,
      picked_up_at: dto.picked_up_at,
      delivered_at: dto.delivered_at,
      courier: { id: dto.courier_id },
      order: { id: dto.order_id },
    });
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({ relations: ["courier", "order"] });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
      relations: ["courier", "order"],
    });
    if (!item) throw new NotFoundException("Assignment not found");
    return item;
  }

  async update(id: number, dto: UpdateCourierAssignmentDto) {
    await this.findOne(id);
    const updated: any = { ...dto };
    if (dto.courier_id) updated.courier = { id: dto.courier_id };
    if (dto.order_id) updated.order = { id: dto.order_id };
    await this.repo.update(id, updated);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
