import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AccessTokenStrategy, RefreshTokenCookieStrategy } from "../common/strategies";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Vendor } from "../vendors/entities/vendor.entity";
import { Courier } from "../couriers/entities/courier.entity";
import { Admin } from "../admins/entities/admin.entity";

@Module({
  imports: [
    JwtModule.register({ global: true }),
    UsersModule,
    TypeOrmModule.forFeature([User, Admin, Vendor, Courier]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenCookieStrategy],
})
export class AuthModule {}
