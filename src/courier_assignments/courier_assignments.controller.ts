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
import { CourierAssignmentsService } from "./courier_assignments.service";
import { CreateCourierAssignmentDto } from "./dto/create-courier_assignment.dto";
import { UpdateCourierAssignmentDto } from "./dto/update-courier_assignment.dto";
import { AccessTokenGuard } from "../common/guards";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles, UserRole } from "../app.constants";

@ApiTags("Courier Assignments")
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller("courier-assignments")
export class CourierAssignmentsController {
  constructor(private readonly service: CourierAssignmentsService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateCourierAssignmentDto) {
    return this.service.create(dto);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.COURIER)
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.service.findOne(+id);
  }

  @Roles(UserRole.COURIER)
  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateCourierAssignmentDto) {
    return this.service.update(+id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(+id);
  }
}
