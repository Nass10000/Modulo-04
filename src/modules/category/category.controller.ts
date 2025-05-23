import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return this.service.getCategories();
  }

  @Post('seeder')
  async seed(): Promise<Category[]> {
    return this.service.seedCategories();
  }
}
