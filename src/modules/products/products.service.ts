import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository'; // ✅ importa el repo

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    private readonly productsRepository: ProductsRepository, // ✅ inyección del repo
  ) {}

  async getAllProducts(page = 1, limit = 10): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return this.productRepo.find({
      relations: ['category'],
      skip,
      take: limit,
    });
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) throw new NotFoundException('Categoría no encontrada');

    const product = this.productRepo.create({ ...dto, category });
    return this.productRepo.save(product);
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');

    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) throw new NotFoundException('Categoría no encontrada');

    const updated = this.productRepo.merge(product, { ...dto, category });
    return this.productRepo.save(updated);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Producto no encontrado');
    }
  }

  async seedProducts(): Promise<{ id: string; name: string }[]> {
    try {
      return await this.productsRepository.seedProducts(); // ahora retorna lo insertado
    } catch (error) {
      console.error('❌ Error al insertar productos:', error);
      throw new InternalServerErrorException('Falló el seeder de productos');
    }
  }
  
}
