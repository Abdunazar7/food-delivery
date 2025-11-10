import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.service.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdatePaymentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(+id);
  }
}
