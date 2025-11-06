import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAddressesService } from "./user_addresses.service";
import { UserAddressesController } from "./user_addresses.controller";
import { UserAddress } from "./entities/user_address.entity";
import { User } from "../users/entities/user.entity";
import { District } from "../districts/entities/district.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress, User, District])],
  controllers: [UserAddressesController],
  providers: [UserAddressesService],
  exports: [UserAddressesService],
})
export class UserAddressesModule {}
