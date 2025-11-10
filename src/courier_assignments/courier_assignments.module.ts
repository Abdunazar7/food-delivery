import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourierAssignmentsService } from "./courier_assignments.service";
import { CourierAssignmentsController } from "./courier_assignments.controller";
import { CourierAssignment } from "./entities/courier_assignment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CourierAssignment])],
  controllers: [CourierAssignmentsController],
  providers: [CourierAssignmentsService],
})
export class CourierAssignmentsModule {}
