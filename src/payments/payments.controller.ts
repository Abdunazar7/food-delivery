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
import { ApiTags } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { AccessTokenGuard } from "../common/guards";
import { Roles, UserRole } from "../app.constants";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Roles(UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  findAll() {
    return this.service.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.service.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdatePaymentDto) {
    return this.service.update(+id, dto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(+id);
  }
}
