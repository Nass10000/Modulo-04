import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetail } from '../order-details/order-detail.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
