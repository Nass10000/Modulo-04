import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { User } from './user.entity';

export type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async getUser(id: string): Promise<Omit<User, 'password' | 'admin'> | null> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) return null;
    const { password, isAdmin, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, isAdmin };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async addUser(user: Partial<User>): Promise<string> {
    const existing = await this.getUserByEmail(user.email as string);
    if (existing) {
      throw new ConflictException('El email ya está en uso');
    }
    const newUser = await this.repo.save(user);
    return newUser.id;
  }

  async updateUser(id: string, user: Partial<User>): Promise<string> {
    await this.repo.update(id, user);
    const updatedUser = await this.repo.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser.id;
  }

  find(options?: FindManyOptions<User>) {
    return this.repo.find(options);
  }

  findOne(options: FindOneOptions<User>) {
    return this.repo.findOne(options);
  }

  create(entity: Partial<User>) {
    return this.repo.create(entity);
  }

  save(entity: Partial<User>) {
    return this.repo.save(entity);
  }

  merge(entity: User, dto: Partial<User>) {
    return this.repo.merge(entity, dto);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }

  async saveUser(user: Partial<User>): Promise<User> {
    return this.repo.save(user);
  }
}
