import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Category } from '../category/category.entity';
  import { OrderDetail } from '../order-details/order-detail.entity';
  
  @Entity('products')
  export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    name: string;    
  
    @Column({ type: 'text' })
    description: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
  
    @Column({ type: 'int' })
    stock: number;
  
    @Column({ default: 'https://via.placeholder.com/150' })
    imgUrl: string;
  
  
    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
  
    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetail[];
  }
  