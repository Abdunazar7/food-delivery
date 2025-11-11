import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { OrderItemsService } from "./order_items.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateOrderItemDto } from "./dto/create-order_item.dto";
import { UpdateOrderItemDto } from "./dto/update-order_item.dto";
import { AccessTokenGuard } from "../common/guards";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles, UserRole } from "../app.constants";

@ApiTags("Order Items")
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller("order-items")
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Roles(UserRole.USER)
  @Post()
  create(@Body() dto: CreateOrderItemDto) {
    return this.orderItemsService.create(dto);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.USER, UserRole.VENDOR, UserRole.COURIER)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.orderItemsService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateOrderItemDto) {
    return this.orderItemsService.update(+id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.orderItemsService.remove(+id);
  }
}
