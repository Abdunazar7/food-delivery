import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import type { Response } from "express";
import { AuthService } from "./auth.service";
import { RefreshTokenGuard } from "../common/guards";
import { GetCurrentUser, GetCurrentUserId } from "../common/decorators";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "./dto/sign-in-user.dto";
import { ResponseFields } from "../common/types";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // =============================
  // 🧍 USER ROUTES
  // =============================

  @Post("user/signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post("user/signin")
  async signinUser(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signinUser(signInUserDto, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("user/signout")
  @HttpCode(HttpStatus.OK)
  async signoutUser(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signoutUser(userId, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("user/refresh")
  @HttpCode(HttpStatus.OK)
  async refreshUser(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.refreshUser(userId, refreshToken, res);
  }

  // =============================
  // 👨‍💼 ADMIN ROUTES
  // =============================

  @Post("admin/signin")
  async signinAdmin(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signinAdmin(signInUserDto, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("admin/signout")
  @HttpCode(HttpStatus.OK)
  async signoutAdmin(
    @GetCurrentUserId() adminId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signoutAdmin(adminId, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("admin/refresh")
  @HttpCode(HttpStatus.OK)
  async refreshAdmin(
    @GetCurrentUserId() adminId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.refreshAdmin(adminId, refreshToken, res);
  }

  // =============================
  // 🏪 VENDOR ROUTES
  // =============================

  @Post("vendor/signin")
  async signinVendor(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signinVendor(signInUserDto, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("vendor/signout")
  @HttpCode(HttpStatus.OK)
  async signoutVendor(
    @GetCurrentUserId() vendorId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signoutVendor(vendorId, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("vendor/refresh")
  @HttpCode(HttpStatus.OK)
  async refreshVendor(
    @GetCurrentUserId() vendorId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.refreshVendor(vendorId, refreshToken, res);
  }

  // =============================
  // 🚴 COURIER ROUTES
  // =============================

  @Post("courier/signin")
  async signinCourier(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signinCourier(signInUserDto, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("courier/signout")
  @HttpCode(HttpStatus.OK)
  async signoutCourier(
    @GetCurrentUserId() courierId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signoutCourier(courierId, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("courier/refresh")
  @HttpCode(HttpStatus.OK)
  async refreshCourier(
    @GetCurrentUserId() courierId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.refreshCourier(courierId, refreshToken, res);
  }
}
