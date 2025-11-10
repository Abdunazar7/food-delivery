import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import bcrypt from "bcrypt";
import { JwtPayload, ResponseFields, Tokens } from "../common/types";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "./dto/sign-in-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService
  ) {}

  private async generateTokens(user: User): Promise<Tokens> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME as any,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME as any,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  // --- SIGNUP ---
  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }

    const newUser = await this.userService.create(createUserDto);

    return {
      message: "Foydalanuvchi yaratildi",
      userId: newUser.id,
    };
  }

  // --- SIGNIN ---
  async signin(
    signInUserDto: SignInUserDto,
    res: Response
  ): Promise<ResponseFields> {
    const user = await this.userRepository.findOne({
      where: { email: signInUserDto.email },
    });

    if (!user) {
      throw new UnauthorizedException("Email yoki parol xato");
    }

    const isPasswordValid = await bcrypt.compare(
      signInUserDto.password,
      user.password_hash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email yoki parol xato");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.userRepository.update(
      { id: user.id },
      { refreshToken_hash: hashedRefreshToken } // ✅ hash saqlaymiz
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return { message: "Tizimga kirdingiz", userId: user.id, accessToken };
  }

  // --- SIGNOUT ---
  async signout(userId: number, res: Response): Promise<boolean> {
    const result = await this.userRepository.update(
      { id: userId },
      { refreshToken_hash: "" }
    );

    if (result.affected === 0) {
      throw new ForbiddenException("User topilmadi yoki allaqachon chiqilgan");
    }

    res.clearCookie("refreshToken");
    return true;
  }

  // --- REFRESH TOKEN ---
  async refreshToken(
    userId: number,
    refreshToken: string,
    res: Response
  ): Promise<ResponseFields> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (userId !== decoded.id) {
        throw new ForbiddenException("User ID mos emas");
      }

      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user || !user.refreshToken_hash) {
        throw new ForbiddenException("Kirish ruxsati yo‘q");
      }

      const tokenMatches = await bcrypt.compare(
        refreshToken,
        user.refreshToken_hash
      );
      if (!tokenMatches) {
        throw new ForbiddenException("Refresh token noto‘g‘ri");
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await this.generateTokens(user);
      const hashedNewToken = await bcrypt.hash(newRefreshToken, 7);

      await this.userRepository.update(
        { id: user.id },
        { refreshToken_hash: hashedNewToken }
      );

      res.cookie("refreshToken", newRefreshToken, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });

      return { message: "Token yangilandi", userId: user.id, accessToken };
    } catch (error) {
      throw new ForbiddenException(
        "Refresh token muddati tugagan yoki noto‘g‘ri"
      );
    }
  }
}
