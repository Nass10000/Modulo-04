import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Order } from '../orders/order.entity';
import { OrderDetail } from '../order-details/order-detail.entity';
import { UsersRepository } from './users.repository';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, OrderDetail])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
