import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Order } from '../orders/order.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Order, (order) => order.detail)
  order: Order;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable({
    name: 'order_details_products',
    joinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];
}
