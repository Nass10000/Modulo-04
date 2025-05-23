import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Category } from '../modules/category/category.entity';
import { User } from '../modules/users/user.entity';
import { Product } from '../modules/products/product.entity';
import { Order } from '../modules/orders/order.entity';
import { OrderDetail } from '../modules/order-details/order-detail.entity';

config({ path: '.env.development' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Product, Category, Order, OrderDetail],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
