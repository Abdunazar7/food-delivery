import { SetMetadata } from "@nestjs/common";

export enum UserRole {
  USER = "user",
  VENDOR = "vendor",
  ADMIN = "admin",
  COURIER = "courier",
}

export const ROLES_KEY = "roles";
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
