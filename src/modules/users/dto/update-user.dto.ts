import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Nassim Aybar',
    description: 'Nombre actualizado del usuario',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'nass@example.com',
    description: 'Nuevo correo electrónico',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'NuevaClave123!',
    description:
      'Nueva contraseña entre 8 y 15 caracteres, con al menos una mayúscula, una minúscula, un número y un carácter especial',
  })
  @IsOptional()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'La nueva contraseña debe tener entre 8 y 15 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*).',
    },
  )
  password?: string;

  @ApiPropertyOptional({
    example: 'Av. Bolívar #123',
    description: 'Nueva dirección del usuario',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 8091234567,
    description: 'Nuevo número de teléfono del usuario',
  })
  @IsOptional()
  @IsInt({ message: 'El teléfono debe ser un número entero' })
  phone?: number;

  @ApiPropertyOptional({
    example: 'República Dominicana',
    description: 'Nuevo país de residencia',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    example: 'Santiago',
    description: 'Nueva ciudad de residencia',
  })
  @IsOptional()
  @IsString()
  city?: string;
}
