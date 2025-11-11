import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "../users/entities/user.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {} // ✅ TO‘G‘RI

  async sendMail(user: User) {
    const url = `${process.env.API_HOST}/api/users/activate/${user.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to Food delivery Api",
      template: "./confirmation",
      context: {
        name: user.full_name,
        url,
      },
    });
  }
}
