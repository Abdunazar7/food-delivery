import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { Admin } from "./entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const {
      email,
      password,
      confirm_password,
      full_name,
      phone_number,
      is_creator,
    } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const exists = await this.adminRepo.findOne({ where: { email } });
    if (exists) throw new BadRequestException("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 7);

    const admin = this.adminRepo.create({
      full_name,
      email,
      phone_number,
      password_hash: hashedPassword,
      is_creator: is_creator ?? false,
      refreshToken_hash: "",
    });

    return this.adminRepo.save(admin);
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepo.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException(`Admin with id ${id} not found`);
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);

    if (updateAdminDto.password && updateAdminDto.confirm_password) {
      if (updateAdminDto.password !== updateAdminDto.confirm_password) {
        throw new BadRequestException("Passwords do not match");
      }
      const hashed = await bcrypt.hash(updateAdminDto.password, 7);
      admin.password_hash = hashed;
    }

    Object.assign(admin, updateAdminDto);
    return this.adminRepo.save(admin);
  }

  async remove(id: number): Promise<void> {
    const admin = await this.findOne(id);
    await this.adminRepo.remove(admin);
  }
}
