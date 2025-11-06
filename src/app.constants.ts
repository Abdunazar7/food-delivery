import { SetMetadata } from "@nestjs/common";

export enum UserRole {
  SUPERADMIN = "superadmin",
  MODERATOR = "moderator",
  USER = "user",
}

export const ROLES_KEY = "roles";
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
