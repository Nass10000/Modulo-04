import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../modules/products/product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../config/cloudinary.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async uploadProductImage(productId: string, file: Express.Multer.File) {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const uploadResult = await this.cloudinaryService.uploadImage(file);
    product.imgUrl = uploadResult.secure_url;
    return this.productRepository.save(product);
  }
}
