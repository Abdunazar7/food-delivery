import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItem } from "./entities/order_item.entity";
import { CreateOrderItemDto } from "./dto/create-order_item.dto";
import { UpdateOrderItemDto } from "./dto/update-order_item.dto";

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>
  ) {}

  create(dto: CreateOrderItemDto) {
    const item = this.orderItemRepo.create({
      quantity: dto.quantity,
      notes: dto.notes,
      order: { id: dto.order_id } as any,
      menuItem: { id: dto.menu_item_id } as any,
    });
    return this.orderItemRepo.save(item);
  }

  findAll() {
    return this.orderItemRepo.find({
      relations: ["order", "menuItem"],
    });
  }

  async findOne(id: number) {
    const item = await this.orderItemRepo.findOne({
      where: { id },
      relations: ["order", "menuItem"],
    });
    if (!item) throw new NotFoundException("Order item not found");
    return item;
  }

  async update(id: number, dto: UpdateOrderItemDto) {
    await this.findOne(id);

    const updateData: any = { ...dto };
    if (dto.order_id) updateData.order = { id: dto.order_id };
    if (dto.menu_item_id) updateData.menu_item = { id: dto.menu_item_id };

    await this.orderItemRepo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.orderItemRepo.delete(id);
  }
}
