import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/user.entity';
import { Role } from '../../roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id, 
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      roles: [user.isAdmin ? Role.Admin : Role.User],
    };
    
    
    
    

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    return { access_token };
  }

  async signup(createUserDto: CreateUserDto) {
    const { password, confirmPassword, ...rest } = createUserDto;

    if (!confirmPassword || password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }
    const existingUser = await this.usersRepository.getUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      ...rest,
      password: hashedPassword,
    } as User;

    const savedUser = await this.usersRepository.saveUser(newUser);
    delete (savedUser as any).password;
    return savedUser;
  }
}
