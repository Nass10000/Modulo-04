import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';
import { Category } from './category.entity';
import { products } from 'src/data/products'; 

@Injectable()
export class CategoryService {
  constructor(private readonly repo: CategoryRepository) {}

  async getCategories(): Promise<Category[]> {
    return this.repo.getCategories();
  }

  async seedCategories(): Promise<Category[]> {
    try {
      const uniqueCategories = [
        ...new Set(products.map((p) => p.category.toLowerCase())),
      ];

      await this.repo.addCategories(uniqueCategories);
      return this.repo.getCategories();
    } catch (error) {
      console.error('❌ Error al insertar categorías:', error);
      throw new InternalServerErrorException('Falló el seeder de categorías');
    }
  }
}
