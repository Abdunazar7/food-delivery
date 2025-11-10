import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { OrderItemsService } from "./order_items.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateOrderItemDto } from "./dto/create-order_item.dto";
import { UpdateOrderItemDto } from "./dto/update-order_item.dto";

@ApiTags("Order Items")
@Controller("order-items")
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() dto: CreateOrderItemDto) {
    return this.orderItemsService.create(dto);
  }

  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.orderItemsService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateOrderItemDto) {
    return this.orderItemsService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.orderItemsService.remove(+id);
  }
}
