import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class CreatorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== "admin" || !user.is_creator) {
      throw new ForbiddenException(
        "Only the creator admin can perform this action"
      );
    }

    return true;
  }
}
