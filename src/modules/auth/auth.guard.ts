import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Falta el header Authorization');
    }

    const [type, encoded] = authHeader.split(' ');

    if (type !== 'Basic' || !encoded) {
      throw new UnauthorizedException('Formato de Authorization inválido');
    }

    try {
      const decoded = Buffer.from(encoded, 'base64').toString('utf-8'); // ← decodificamos base64
      const [email, password] = decoded.split(':');

      if (!email || !password) {
        throw new UnauthorizedException('Credenciales incompletas');
      }

      request['auth'] = { email, password };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Error al decodificar credenciales');
    }
  }
}
