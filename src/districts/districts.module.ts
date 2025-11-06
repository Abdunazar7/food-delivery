import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DistrictsService } from "./districts.service";
import { DistrictsController } from "./districts.controller";
import { District } from "./entities/district.entity";
import { Region } from "../regions/entities/region.entity";

@Module({
  imports: [TypeOrmModule.forFeature([District, Region])],
  controllers: [DistrictsController],
  providers: [DistrictsService],
  exports: [DistrictsService],
})
export class DistrictsModule {}
