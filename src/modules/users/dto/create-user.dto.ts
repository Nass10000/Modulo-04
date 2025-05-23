import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  IsEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Nassim Aybar',
    description: 'Nombre completo del usuario',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser texto.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name: string;

  @ApiProperty({
    example: 'nassum@example.com',
    description: 'Correo electrónico único del usuario',
  })
  @IsEmail({}, { message: 'Debe tener un formato válido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;

  @ApiProperty({
    example: 'Av. Independencia #123',
    description: 'Dirección física del usuario',
  })
  @IsString({ message: 'La dirección debe ser texto.' })
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres.' })
  address: string;

  @ApiProperty({
    example: 8095551234,
    description: 'Número de teléfono del usuario',
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'El número debe ser un número.' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
//   @Min(1000000000, { message: 'El teléfono debe tener al menos 10 dígitos.' })  // mínimo 10 dígitos///hay que hacer las debidas importaciones para que funcione
// @Max(999999999999999, { message: 'El teléfono no puede tener más de 15 dígitos.' }) // máximo 15 dígitos
  phone: number;

  @ApiProperty({
    example: 'República Dominicana',
    description: 'País de residencia del usuario',
  })
  @IsString({ message: 'El país debe ser texto.' })
  @IsNotEmpty({ message: 'El país es obligatorio.' })
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres.' })
  country: string;

  @ApiProperty({
    example: 'Santo Domingo',
    description: 'Ciudad del usuario',
  })
  @IsString({ message: 'La ciudad debe ser texto.' })
  @IsNotEmpty({ message: 'La ciudad es obligatoria.' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres.' })
  city: string;

  @ApiProperty({
    example: 'Clave100!',
    description:
      'Contraseña entre 8 y 15 caracteres. Debe tener mayúscula, minúscula, número y carácter especial',
  })
  @IsString({ message: 'La contraseña debe ser texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Debe tener entre 8 y 15 caracteres, con al menos una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*).',
    },
  )
  password: string;

  @ApiProperty({
    example: 'Clave123!',
    description: 'Confirmación de la contraseña',
  })
  @IsString({ message: 'La confirmación debe ser texto.' })
  @IsNotEmpty({ message: 'La confirmación es obligatoria.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Debe tener entre 8 y 15 caracteres, con al menos una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*).',
    },
  )
  confirmPassword: string;

  @ApiProperty({
    description: 'Campo interno, no debe ser enviado por el cliente',
    readOnly: true,
  })
  @IsEmpty({ message: 'No se permite asignar este campo manualmente' })
  isAdmin: boolean;
}
