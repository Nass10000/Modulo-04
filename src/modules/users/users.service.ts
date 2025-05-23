import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { User } from './user.entity';

export interface MinimalOrder {
  id: string;
  date: Date;
}

export interface MinimalUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  address: string | null;
  city: string | null;
  orders: MinimalOrder[];
}

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async getUsers(page = 1, limit = 5) {   
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      skip,
      take: limit,
      relations: ['orders'],
    });

    return users.map(({ password, orders, ...rest }) => {
      const minimalOrders = orders.map(order => ({
        id: order.id,
        date: order.date,
      }));

      return {
        ...rest,
        orders: minimalOrders,
      };
    });
  }

  async getAdmins(): Promise<MinimalUser[]> {
    const admins = await this.usersRepository.find({
      where: { isAdmin: true },
      relations: ['orders'],
    });

    return admins.map(({ password, orders, phone, ...rest }) => {
      const minimalOrders = orders.map(order => ({
        id: order.id,
        date: order.date,
      }));

      return {
        ...rest,
        phone: phone ? phone.toString() : null,
        orders: minimalOrders,
      };
    });
  }

  async getUserById(id: string): Promise<Omit<User, 'password' | 'orders'> & { orders: MinimalOrder[] }> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const { password, orders, ...rest } = user;
    const minimalOrders = orders.map(order => ({
      id: order.id,
      date: order.date,
    }));

    return {
      ...rest,
      orders: minimalOrders,
    };
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(dto.password, 10);
    const user = this.usersRepository.create({ ...dto, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const updated = this.usersRepository.merge(user, dto);
    return this.usersRepository.save(updated);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
