import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException("User info not found in request");

    const paramId = Number(request.params.id);
    if (!paramId)
      throw new ForbiddenException("Invalid or missing resource ID");

    if (user.id !== paramId) {
      throw new ForbiddenException("Access denied — not your account");
    }

    return true;
  }
}
