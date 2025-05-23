import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'nassum@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email: string;

  @ApiProperty({
    example: 'Clave100!',
    description: 'Contraseña del usuario',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
