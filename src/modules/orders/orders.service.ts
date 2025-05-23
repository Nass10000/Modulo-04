import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './order.entity';
import { OrderDetail } from '../order-details/order-detail.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async addOrder(data: { userId: string; products: { id: string }[] }) {
    const { userId, products } = data;
  
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
  
    const productIds = products.map(p => p.id);
    const foundProducts = await this.productRepo.find({
      where: { id: In(productIds) },
    });
  
    const availableProducts = foundProducts.filter(product => product.stock >= 1);
  
    if (availableProducts.length === 0) {
      throw new NotFoundException('Ningún producto válido fue encontrado');
    }
  
    let total = 0;
    for (const product of availableProducts) {
      total += Number(product.price);
      product.stock -= 1;                       // aqui solo permite comprar un producto por orden
      await this.productRepo.save(product);
    }
  
    const order = this.orderRepo.create({ user, date: new Date(), total });
    await this.orderRepo.save(order);
  
    const detail = this.orderDetailRepo.create({
      price: total,
      order,
      products: availableProducts,
    });
    await this.orderDetailRepo.save(detail);

    // 🔥 Vincula el detalle con la orden
    order.detail = detail;
    await this.orderRepo.save(order);
  
    return {
      orderId: order.id,
      total: detail.price,
      detailId: detail.id,
    };
  }

  async getOrder(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'detail', 'detail.products'],
    });

    if (!order) throw new NotFoundException('Orden no encontrada');

    return {
      id: order.id,
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
      date: order.date,
      total: order.total,
      detail: {
        id: order.detail.id,
        products: order.detail.products.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
        })),
      },
    };
  }
}
