import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.ordersService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.ordersService.remove(+id);
  }
}
