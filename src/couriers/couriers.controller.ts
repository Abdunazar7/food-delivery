import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { CouriersService } from "./couriers.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateCourierDto } from "./dto/create-courier.dto";
import { UpdateCourierDto } from "./dto/update-courier.dto";

@ApiTags("Couriers")
@Controller("couriers")
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Post()
  create(@Body() dto: CreateCourierDto) {
    return this.couriersService.create(dto);
  }

  @Get()
  findAll() {
    return this.couriersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.couriersService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateCourierDto) {
    return this.couriersService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.couriersService.remove(+id);
  }
}
