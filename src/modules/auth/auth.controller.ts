import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signin(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  
}
