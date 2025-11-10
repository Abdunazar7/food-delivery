import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, confirm_password, full_name, phone } =
      createUserDto as any;

    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const exists = await this.userRepository.findOne({ where: { email } });
    if (exists) throw new BadRequestException("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 7);

    const user = this.userRepository.create({
      full_name: full_name,
      email,
      password_hash: hashedPassword,
      phone: phone,
      is_active: false,
      refreshToken_hash: "",
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: ["addresses", "orders", "reviews"],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["addresses", "orders", "reviews"],
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      user.password_hash = await bcrypt.hash(updateUserDto.password, 7);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<number> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const deletedUserId = user.id;
    await this.userRepository.remove(user);
    return deletedUserId;
  }
}
