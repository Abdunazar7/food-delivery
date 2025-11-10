import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Response } from "express";
import { RefreshTokenGuard } from "../common/guards";
import { GetCurrentUser, GetCurrentUserId } from "../common/decorators";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "./dto/sign-in-user.dto";
import { ResponseFields } from "../common/types";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post("signin")
  async signin(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(signInUserDto, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("signout")
  @HttpCode(HttpStatus.OK)
  async signout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signout(userId, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.refreshToken(userId, refreshToken, res);
  }
}
