import { PartialType } from "@nestjs/swagger";
import { CreateCourierAssignmentDto } from "./create-courier_assignment.dto";

export class UpdateCourierAssignmentDto extends PartialType(
  CreateCourierAssignmentDto
) {}
