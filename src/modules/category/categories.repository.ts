import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async addCategories(categories: string[]): Promise<Category[]> {
    const existing = await this.categoryRepo.find();
    const existingNames = existing.map((cat) => cat.name);

    const newCategories = categories
      .filter((name) => !existingNames.includes(name))
      .map((name) => this.categoryRepo.create({ name }));

    return this.categoryRepo.save(newCategories);
  }
}
