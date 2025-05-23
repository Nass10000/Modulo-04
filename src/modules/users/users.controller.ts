import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  NotFoundException,
  ParseUUIDPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guard/roles.guard';

import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



// 🔐 SOLO ADMINISTRADORES
@Get()
@ApiBearerAuth()
@ApiQuery({ name: 'page', required: true, type: Number })
@ApiQuery({ name: 'limit', required: true, type: Number })
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
async getUsers(
  @Query('page') page = 1,
  @Query('limit') limit = 5,
) {
  return this.usersService.getUsers(+page, +limit);
}



  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

 // 🔓 PÚBLICO - REGISTRO (OBSOLETO - usa /auth/signup en su lugar)
// @ApiOperation({ summary: '❌ NO USAR. Usa /auth/signup en su lugar.' })
// @Post()
// @UsePipes(new ValidationPipe())
// async createUser(@Body() dto: CreateUserDto) {
//   return this.usersService.createUser(dto);
// }




  // 🔐 EDITAR USUARIO
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    const updated = await this.usersService.updateUser(id, dto);
    if (!updated) throw new NotFoundException('Usuario no encontrado');
    return updated;
  }

  // 🔐 ELIMINAR USUARIO
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.usersService.deleteUser(id);
    return { message: 'Usuario eliminado correctamente' };
  }


}
