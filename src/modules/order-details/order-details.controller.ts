import { Controller, Get } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order-details')
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get()
  getOrderDetails() {
    return this.orderDetailsService.getOrderDetails();
  }
}
