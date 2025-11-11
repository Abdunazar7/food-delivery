import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { AccessTokenGuard } from "../common/guards";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles, UserRole } from "../app.constants";
import { userInfo } from "os";
import { User } from "../users/entities/user.entity";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR, UserRole.COURIER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR, UserRole.COURIER, UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.ordersService.findOne(+id);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR, UserRole.COURIER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(+id, dto);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.ordersService.remove(+id);
  }
}
