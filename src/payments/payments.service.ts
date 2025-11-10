import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./entities/payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private repo: Repository<Payment>
  ) {}

  create(dto: CreatePaymentDto) {
    const payment = this.repo.create({
      amount: dto.amount,
      currency: dto.currency,
      method: dto.method,
      provider: dto.provider,
      status: dto.status,
      paid_at: dto.paid_at,
      order: { id: dto.order_id },
    });
    return this.repo.save(payment);
  }

  findAll() {
    return this.repo.find({ relations: ["order"] });
  }

  async findOne(id: number) {
    const payment = await this.repo.findOne({
      where: { id },
      relations: ["order"],
    });
    if (!payment) throw new NotFoundException("Payment not found");
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto) {
    await this.findOne(id);
    const updateData: any = { ...dto };
    if (dto.order_id) updateData.order = { id: dto.order_id };
    await this.repo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
