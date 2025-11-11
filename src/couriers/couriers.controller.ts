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
import { CouriersService } from "./couriers.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateCourierDto } from "./dto/create-courier.dto";
import { UpdateCourierDto } from "./dto/update-courier.dto";
import { AccessTokenGuard } from "../common/guards";
import { Roles, UserRole } from "../app.constants";
import { RolesGuard } from "../common/guards/roles.guard";
import { SelfGuard } from "../common/guards/self.guard";

@ApiTags("Couriers")
@Controller("couriers")
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  create(@Body() dto: CreateCourierDto) {
    return this.couriersService.create(dto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  findAll() {
    return this.couriersService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.COURIER)
  @UseGuards(AccessTokenGuard, RolesGuard, SelfGuard)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.couriersService.findOne(+id);
  }

  @Roles(UserRole.COURIER)
  @UseGuards(AccessTokenGuard, RolesGuard, SelfGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateCourierDto) {
    return this.couriersService.update(+id, dto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.couriersService.remove(+id);
  }
}
