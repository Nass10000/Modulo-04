import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const token = request.headers['authorization']?.split(' ')[1];
  
      if (!token) {
        throw new UnauthorizedException('Bearer token no encontrado');
      }
  
      try {
        const secret = process.env.JWT_SECRET;
        const payload = await this.jwtService.verifyAsync(token, { secret });
  
        request['user'] = payload; // Guarda el payload para usarlo en el controller
        return true;
      } catch (err) {
        throw new UnauthorizedException('Token inválido o expirado');
      }
    }
  }
  