import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import { products as preloadProducts } from '../../data/products';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.repo.find({ relations: ['category'] });
  }

  async getById(id: string): Promise<Product | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const newProduct = this.repo.create(productData);
    return await this.repo.save(newProduct);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product | null> {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) return null;
    Object.assign(product, productData);
    return await this.repo.save(product);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async seedProducts(): Promise<{ id: string; name: string }[]> {
    try {
      const categories = await this.categoriesRepo.find();
      const insertedProducts: { id: string; name: string }[] = [];

      await Promise.all(
        preloadProducts.map(async (element) => {
          const productCategory = categories.find(
            (category) => category.name.toLowerCase() === element.category.toLowerCase(),
          );

          if (!productCategory) {
            console.warn(`⚠️ Categoría no encontrada: ${element.category}`);
            return;
          }

          const product = this.repo.create({
            name: element.name,
            description: element.description,
            price: element.price,
            stock: element.stock,
            imgUrl: element.imgUrl || 'https://via.placeholder.com/150',
            category: productCategory,
          });

          try {
            const result = await this.repo
              .createQueryBuilder()
              .insert()
              .into(Product)
              .values(product)
              .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
              .returning(['id', 'name'])
              .execute();

            insertedProducts.push(...result.raw);
          } catch (innerError) {
            console.error(`❌ Error al insertar el producto: ${element.name}`);
            console.error(innerError.message);
            console.error(innerError.stack);
          }
        }),
      );

      return insertedProducts;
    } catch (error) {
      console.error('❌ Error general en el seeder de productos:', error.message);
      console.error(error.stack);
      throw new InternalServerErrorException('Falló el seeder de productos');
    }
  }
}
