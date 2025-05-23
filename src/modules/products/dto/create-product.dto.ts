import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop ASUS ROG',
    description: 'Nombre del producto',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Laptop gamer con procesador Ryzen 7 y 16GB RAM',
    description: 'Descripción detallada del producto',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1299.99,
    description: 'Precio del producto',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 20,
    description: 'Cantidad disponible en stock',
  })
  @IsNumber()
  stock: number;

  @ApiPropertyOptional({
    example: 'https://cloudinary.com/product1.jpg',
    description: 'URL de la imagen del producto (opcional)',
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'ID de la categoría asociada al producto',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
