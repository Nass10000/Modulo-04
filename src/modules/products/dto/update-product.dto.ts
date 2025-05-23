import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'Laptop ASUS ROG Zephyrus',
    description: 'Nuevo nombre del producto',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Laptop gamer con tarjeta RTX 4060 y SSD de 1TB',
    description: 'Nueva descripción del producto',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 1499.99,
    description: 'Nuevo precio del producto',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: 15,
    description: 'Nuevo stock disponible',
  })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/db/image.jpg',
    description: 'Nueva URL de imagen del producto',
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ApiPropertyOptional({
    example: 'ab12cd34-ef56-7890-ab12-cd34ef567890',
    description: 'ID de la nueva categoría asociada',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;
}
