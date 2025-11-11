import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./entities/user.entity";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  // MUHIM O'ZGATIRISH: User entity'sini eksport qiling
  // shunda AuthModule ham Repository<User> ga kirisha oladi.
  exports: [UsersService, TypeOrmModule],
  // Yoki TypeOrmModule'ni eksport qilamiz.
})
export class UsersModule {}
