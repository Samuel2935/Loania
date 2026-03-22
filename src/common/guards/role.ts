@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req.user.role === 'admin';
  }
}