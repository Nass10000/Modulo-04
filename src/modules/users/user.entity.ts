import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    select: false,      
  })
  password: string;
  
  
  @Column({ type: 'bigint', nullable: true })
 phone: number;

  
  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
  
  @Column({ name: 'admin', default: false }) 
  isAdmin: boolean;
  


}
