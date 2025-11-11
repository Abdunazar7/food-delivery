import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { User } from '../users/entities/user.entity';

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post("send")
  async send(@Body() user: User) {
    return this.mailService.sendMail(user);
  }
}
