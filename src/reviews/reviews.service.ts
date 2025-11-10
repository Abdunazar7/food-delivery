import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Order } from "../orders/entities/order.entity";
import { User } from "../users/entities/user.entity";
import { Courier } from "../couriers/entities/courier.entity";
import { Vendor } from "../vendors/entities/vendor.entity";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,

    @InjectRepository(Vendor)
    private readonly vendorRepo: Repository<Vendor>,

    @InjectRepository(Courier)
    private readonly courierRepo: Repository<Courier>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { targetType, targetId, userId, orderId } = dto;

    // 1️⃣ Check that user exists
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    // 2️⃣ Check that order exists
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order)
      throw new NotFoundException(`Order with id ${orderId} not found`);

    // 3️⃣ Check target existence (Vendor or Courier)
    if (targetType === "vendor") {
      const vendor = await this.vendorRepo.findOne({ where: { id: targetId } });
      if (!vendor)
        throw new BadRequestException(`Vendor with id ${targetId} not found`);
    } else if (targetType === "courier") {
      const courier = await this.courierRepo.findOne({
        where: { id: targetId },
      });
      if (!courier)
        throw new BadRequestException(`Courier with id ${targetId} not found`);
    } else {
      throw new BadRequestException(
        `Invalid targetType: must be 'vendor' or 'courier'`
      );
    }

    // 4️⃣ Create & save review
    const review = this.reviewRepo.create({
      ...dto,
      user,
      order,
    });

    return await this.reviewRepo.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepo.find({
      order: { createdAt: "DESC" },
      relations: ["user", "order", "vendor", "courier"],
    });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ["user", "order", "vendor", "courier"],
    });
    if (!review) throw new NotFoundException(`Review with ID ${id} not found`);
    return review;
  }

  async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    Object.assign(review, dto);
    return await this.reviewRepo.save(review);
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepo.remove(review);
  }

  async findByTarget(
    targetType: "vendor" | "courier",
    targetId: number
  ): Promise<Review[]> {
    return this.reviewRepo.find({
      where: { targetType, targetId },
      relations: [
        "user",
        "order",
        ...(targetType === "vendor" ? ["vendor"] : ["courier"]),
      ],
      order: { createdAt: "DESC" },
    });
  }
}
