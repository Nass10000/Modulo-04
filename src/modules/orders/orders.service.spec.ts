import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { OrderDetail } from '../order-details/order-detail.entity';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 'order-id-1',
              total: 179.89,
              status: 'pending',
              date: new Date(),
              user: { id: 'user-id-1' },
              detail: {
                id: 'detail-id-1',
                products: [{
                  id: 'product-id-1',
                  name: 'Producto 1',
                  price: 179.89,
                }],
              },
            }),
            create: jest.fn().mockImplementation((dto) => dto), // ✅ agregado
            save: jest.fn().mockImplementation((order) => ({ id: 'generated-id', ...order })),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 'user-id-1', name: 'Nass' }),
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue([{
              id: 'product-id-1',
              name: 'Producto 1',
              price: 179.89,
              stock: 10,
            }]),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(OrderDetail),
          useValue: {
            create: jest.fn().mockImplementation((dto) => dto), // ✅ agregado
            save: jest.fn().mockResolvedValue({ id: 'detail-id-1', price: 179.89 }),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('debe devolver una orden por ID', async () => {
    const order = await service.getOrder('order-id-1');
    expect(order).toBeDefined();
    expect(order.id).toBe('order-id-1');
    expect(order.detail.id).toBe('detail-id-1');
    expect(order.detail.products.length).toBeGreaterThan(0);
  });

  it('debe crear una nueva orden', async () => {
    const dto: CreateOrderDto = {
      userId: 'user-id-1',
      products: [{ id: 'product-id-1' }],
    };

    const result = await service.addOrder(dto);
    expect(result).toHaveProperty('orderId');
    expect(result).toHaveProperty('total');
    expect(result.total).toBeGreaterThan(0);
  });
});
