import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { OrderDetail } from '../order-details/order-detail.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @OneToOne(() => OrderDetail, (detail) => detail.order)
  @JoinColumn()
  detail: OrderDetail;

  @Column({ nullable: true })
  detailId: string;
}
