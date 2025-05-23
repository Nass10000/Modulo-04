import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../modules/products/product.entity';
import { ProductsModule } from '../modules/products/products.module';
import { CloudinaryService } from 'src/config/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductsModule],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryService],
})
export class FilesModule {}
