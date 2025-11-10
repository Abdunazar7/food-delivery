import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>
  ) {}

  create(dto: CreateOrderDto) {
    const order = this.orderRepo.create({
      status: dto.status,
      total_price: dto.total_price,
      delivery_fee: dto.delivery_fee, // Qo'shildi
      tip_amount: dto.tip_amount, // Qo'shildi
      user: { id: dto.user_id } as any,
      vendor: { id: dto.vendor_id } as any,
      courier: dto.courier_id ? ({ id: dto.courier_id } as any) : null,
      // Entity'ga moslashtirildi (vendorAddress)
      vendorAddress: { id: dto.vendor_address_id } as any,
      // Entity'ga moslashtirildi (deliveryAddress)
      deliveryAddress: dto.delivery_address_id
        ? ({ id: dto.delivery_address_id } as any)
        : null,
    });
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({
      relations: [
        "user",
        "vendor",
        "courier",
        "vendorAddress", // Entity'ga moslashtirildi
        "deliveryAddress", // Entity'ga moslashtirildi
        "orderItems",
        "payments",
        "reviews",
        "assignments", // Entity'da mavjud edi
      ],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: [
        "user",
        "vendor",
        "courier",
        "vendorAddress", // Entity'ga moslashtirildi
        "deliveryAddress", // Entity'ga moslashtirildi
        "orderItems",
        "payments",
        "reviews",
        "assignments", // Entity'da mavjud edi
      ],
    });
    if (!order) throw new NotFoundException("Order not found");
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    await this.findOne(id);

    const {
      user_id,
      vendor_id,
      courier_id,
      vendor_address_id,
      delivery_address_id,
      ...rest
    } = dto;

    const updatePayload: any = { ...rest };

    if (user_id) updatePayload.user = { id: user_id };
    if (vendor_id) updatePayload.vendor = { id: vendor_id };
    if (courier_id) updatePayload.courier = { id: courier_id };

    // Entity'ga moslashtirildi
    if (vendor_address_id)
      updatePayload.vendorAddress = { id: vendor_address_id };

    // Entity'ga moslashtirildi
    if (delivery_address_id)
      updatePayload.deliveryAddress = { id: delivery_address_id };

    await this.orderRepo.update(id, updatePayload);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.orderRepo.delete(id);
  }
}
