import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import { ProductsRepository } from './products.repository'; 

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository], 
})
export class ProductsModule {}
