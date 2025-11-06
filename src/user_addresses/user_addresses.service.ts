import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserAddress } from "./entities/user_address.entity";
import { CreateUserAddressDto } from "./dto/create-user_address.dto";
import { UpdateUserAddressDto } from "./dto/update-user_address.dto";
import { District } from "../districts/entities/district.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class UserAddressesService {
  constructor(
    @InjectRepository(UserAddress)
    private addressRepo: Repository<UserAddress>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(District)
    private districtRepo: Repository<District>
  ) {}

  async create(dto: CreateUserAddressDto): Promise<UserAddress> {
    const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
    if (!user)
      throw new NotFoundException(`User with id ${dto.user_id} not found`);

    const district = await this.districtRepo.findOne({
      where: { id: dto.district_id },
    });
    if (!district)
      throw new NotFoundException(
        `District with id ${dto.district_id} not found`
      );

    const address = this.addressRepo.create({
      ...dto,
      user,
      district,
    });

    return this.addressRepo.save(address);
  }

  findAll(): Promise<UserAddress[]> {
    return this.addressRepo.find({ relations: ["user", "district"] });
  }

  async findOne(id: number): Promise<UserAddress> {
    const address = await this.addressRepo.findOne({
      where: { id },
      relations: ["user", "district"],
    });
    if (!address)
      throw new NotFoundException(`UserAddress with id ${id} not found`);
    return address;
  }

  async update(id: number, dto: UpdateUserAddressDto): Promise<UserAddress> {
    const address = await this.findOne(id);

    if (dto.user_id) {
      const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
      if (!user)
        throw new NotFoundException(`User with id ${dto.user_id} not found`);
      address.user = user;
    }

    if (dto.district_id) {
      const district = await this.districtRepo.findOne({
        where: { id: dto.district_id },
      });
      if (!district)
        throw new NotFoundException(
          `District with id ${dto.district_id} not found`
        );
      address.district = district;
    }

    Object.assign(address, dto);

    return this.addressRepo.save(address);
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepo.remove(address);
  }
}
