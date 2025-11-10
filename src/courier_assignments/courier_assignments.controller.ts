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
import { CourierAssignmentsService } from "./courier_assignments.service";
import { CreateCourierAssignmentDto } from "./dto/create-courier_assignment.dto";
import { UpdateCourierAssignmentDto } from "./dto/update-courier_assignment.dto";

@ApiTags("Courier Assignments")
@Controller("courier-assignments")
export class CourierAssignmentsController {
  constructor(private readonly service: CourierAssignmentsService) {}

  @Post()
  create(@Body() dto: CreateCourierAssignmentDto) {
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
  update(@Param("id") id: number, @Body() dto: UpdateCourierAssignmentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(+id);
  }
}
