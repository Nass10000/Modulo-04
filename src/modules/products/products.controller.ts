import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guard/roles.guard';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('seeder')
  async seedProducts() {
    const inserted = await this.productsService.seedProducts();
    return {
      message: 'Seeder ejecutado con éxito',
      insertados: inserted,
    };
  }

  @Get()
  getProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productsService.getAllProducts(page, limit);
  }

  @Get(':id')
  async getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.getProductById(id);
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    const updated = await this.productsService.updateProduct(id, dto);
    if (!updated) throw new NotFoundException('Producto no encontrado');
    return updated;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.productsService.deleteProduct(id);
    return { message: 'Producto eliminado correctamente' };
  }
}
