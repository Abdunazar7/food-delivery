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
import { Admin } from "../admins/entities/admin.entity";
import { Vendor } from "../vendors/entities/vendor.entity";
import { Courier } from "../couriers/entities/courier.entity";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "./dto/sign-in-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>,
    private readonly userService: UsersService
  ) {}

  // ✅ 1. TOKEN GENERATION
  private async generateTokens(entity: any, role: string): Promise<Tokens> {
    const payload: JwtPayload = {
      id: entity.id,
      email: entity.email || entity.owner_email,
      is_active: entity.is_active,
      role, // 🔥 rolni qo'shdik
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

  private async saveRefreshToken(
    repository: Repository<any>,
    id: number,
    refreshToken: string
  ) {
    const hashed = await bcrypt.hash(refreshToken, 7);
    await repository.update({ id }, { refreshToken_hash: hashed });
  }

  private setCookie(res: Response, token: string) {
    res.cookie("refreshToken", token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
  }

  private clearCookie(res: Response) {
    res.clearCookie("refreshToken");
  }

  // =============================
  // 🧍 USER AUTH
  // =============================
  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (candidate) throw new ConflictException("Bunday foydalanuvchi mavjud");

    const newUser = await this.userService.create(createUserDto);
    return { message: "Foydalanuvchi yaratildi", userId: newUser.id };
  }

  async signinUser(
    signInUserDto: SignInUserDto,
    res: Response
  ): Promise<ResponseFields> {
    const user = await this.userRepository.findOne({
      where: { email: signInUserDto.email },
    });
    if (!user) throw new UnauthorizedException("Email yoki parol noto‘g‘ri");

    const valid = await bcrypt.compare(
      signInUserDto.password,
      user.password_hash
    );
    if (!valid) throw new UnauthorizedException("Email yoki parol noto‘g‘ri");

    const { accessToken, refreshToken } = await this.generateTokens(
      user,
      "user"
    );
    await this.saveRefreshToken(this.userRepository, user.id, refreshToken);
    this.setCookie(res, refreshToken);

    return { message: "User tizimga kirdi", userId: user.id, accessToken };
  }

  async refreshUser(
    userId: number,
    refreshToken: string,
    res: Response
  ): Promise<ResponseFields> {
    return this.refreshGeneric(
      this.userRepository,
      userId,
      refreshToken,
      res,
      "user"
    );
  }

  async signoutUser(userId: number, res: Response): Promise<boolean> {
    return this.signoutGeneric(this.userRepository, userId, res);
  }

  // =============================
  // 👨‍💼 ADMIN AUTH
  // =============================
  async signinAdmin(
    signInUserDto: SignInUserDto,
    res: Response
  ): Promise<ResponseFields> {
    const admin = await this.adminRepository.findOne({
      where: { email: signInUserDto.email },
    });
    if (!admin) throw new UnauthorizedException("Email yoki parol noto‘g‘ri");

    const valid = await bcrypt.compare(
      signInUserDto.password,
      admin.password_hash
    );
    if (!valid) throw new UnauthorizedException("Email yoki parol noto‘g‘ri");

    const { accessToken, refreshToken } = await this.generateTokens(
      admin,
      "admin"
    );
    await this.saveRefreshToken(this.adminRepository, admin.id, refreshToken);
    this.setCookie(res, refreshToken);

    return { message: "Admin tizimga kirdi", userId: admin.id, accessToken };
  }

  async refreshAdmin(
    adminId: number,
    refreshToken: string,
    res: Response
  ): Promise<ResponseFields> {
    return this.refreshGeneric(
      this.adminRepository,
      adminId,
      refreshToken,
      res,
      "admin"
    );
  }

  async signoutAdmin(adminId: number, res: Response): Promise<boolean> {
    return this.signoutGeneric(this.adminRepository, adminId, res);
  }

  // =============================
  // 🏪 VENDOR AUTH
  // =============================
  async signinVendor(
    signInUserDto: SignInUserDto,
    res: Response
  ): Promise<ResponseFields> {
    const vendor = await this.vendorRepository.findOne({
      where: { owner_email: signInUserDto.email },
    });
    if (!vendor) throw new UnauthorizedException("Email yoki parol noto‘g‘ri");

    const valid = await bcrypt.compare(
      signInUserDto.password,
      vendor.password_hash
    );
    if (!valid) throw new UnauthorizedException("Email yoki parol noto‘g‘ri");

    const { accessToken, refreshToken } = await this.generateTokens(
      vendor,
      "vendor"
    );
    await this.saveRefreshToken(this.vendorRepository, vendor.id, refreshToken);
    this.setCookie(res, refreshToken);

    return { message: "Vendor tizimga kirdi", userId: vendor.id, accessToken };
  }

  async refreshVendor(
    vendorId: number,
    refreshToken: string,
    res: Response
  ): Promise<ResponseFields> {
    return this.refreshGeneric(
      this.vendorRepository,
      vendorId,
      refreshToken,
      res,
      "vendor"
    );
  }

  async signoutVendor(vendorId: number, res: Response): Promise<boolean> {
    return this.signoutGeneric(this.vendorRepository, vendorId, res);
  }

  // =============================
  // 🚴 COURIER AUTH
  // =============================
  async signinCourier(
    signInUserDto: SignInUserDto,
    res: Response
  ): Promise<ResponseFields> {
    const courier = await this.courierRepository.findOne({
      where: { email: signInUserDto.email },
    });
    if (!courier) throw new UnauthorizedException("Email yoki parol noto‘g‘ri");

    const valid = await bcrypt.compare(
      signInUserDto.password,
      courier.password_hash
    );
    if (!valid) throw new UnauthorizedException("Email yoki parol noto‘g‘ri");

    const { accessToken, refreshToken } = await this.generateTokens(
      courier,
      "courier"
    );
    await this.saveRefreshToken(
      this.courierRepository,
      courier.id,
      refreshToken
    );
    this.setCookie(res, refreshToken);

    return {
      message: "Courier tizimga kirdi",
      userId: courier.id,
      accessToken,
    };
  }

  async refreshCourier(
    courierId: number,
    refreshToken: string,
    res: Response
  ): Promise<ResponseFields> {
    return this.refreshGeneric(
      this.courierRepository,
      courierId,
      refreshToken,
      res,
      "courier"
    );
  }

  async signoutCourier(courierId: number, res: Response): Promise<boolean> {
    return this.signoutGeneric(this.courierRepository, courierId, res);
  }

  // =============================
  // ♻️ GENERIC REFRESH & SIGNOUT
  // =============================
  private async refreshGeneric(
    repo: Repository<any>,
    id: number,
    refreshToken: string,
    res: Response,
    role: string
  ): Promise<ResponseFields> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (id !== decoded.id) throw new ForbiddenException("ID mos emas");

      const entity = await repo.findOne({ where: { id } });
      if (!entity || !entity.refreshToken_hash) {
        throw new ForbiddenException("Ruxsat yo‘q");
      }

      const match = await bcrypt.compare(
        refreshToken,
        entity.refreshToken_hash
      );
      if (!match) throw new ForbiddenException("Refresh token noto‘g‘ri");

      const { accessToken, refreshToken: newToken } = await this.generateTokens(
        entity,
        role
      );
      await this.saveRefreshToken(repo, id, newToken);
      this.setCookie(res, newToken);

      return { message: "Token yangilandi", userId: id, accessToken };
    } catch (e) {
      throw new ForbiddenException(
        "Refresh token muddati tugagan yoki noto‘g‘ri"
      );
    }
  }

  private async signoutGeneric(
    repo: Repository<any>,
    id: number,
    res: Response
  ): Promise<boolean> {
    const result = await repo.update({ id }, { refreshToken_hash: "" });
    if (result.affected === 0) {
      throw new ForbiddenException("Entity topilmadi yoki chiqilgan");
    }
    this.clearCookie(res);
    return true;
  }
}
