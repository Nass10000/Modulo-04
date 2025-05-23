import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '.././auth/guard/jwt-auth.guard';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.addOrder(dto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getOrder(id);
    if (!order) throw new NotFoundException('Orden no encontrada');
    return order;
  }
}
