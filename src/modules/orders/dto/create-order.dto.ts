import {
  IsUUID,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductIdDto {
  @ApiProperty({
    example: 'f88a5056-1f7f-4db3-9779-163ab3c1fbd0',
    description: 'ID del producto a comprar',
  })
  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  @ApiProperty({
    example: '3b1fc8f3-174f-44a5-91bb-08c1e0fc3e94',
    description: 'ID del usuario que realiza la orden',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Lista de productos (mínimo 1) que se van a comprar',
    type: ProductIdDto,
    isArray: true,
    example: [{ id: 'f88a5056-1f7f-4db3-9779-163ab3c1fbd0' }],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'La orden debe tener al menos un producto' })// aqui se especifica que solo habra un producto por orden
  @ValidateNested({ each: true })
  @Type(() => ProductIdDto)
  products: ProductIdDto[];
}
