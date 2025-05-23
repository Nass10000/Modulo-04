import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '../category/category.entity';
import { ProductsRepository } from './products.repository';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Producto 1',
      description: 'Descripción 1',
      price: 100.5,
      stock: 10,
      imgUrl: '',
      category: { id: 'cat-id-1', name: 'Mock Categoria' } as any,
      orderDetails: [],
    },
    {
      id: '2',
      name: 'Producto 2',
      description: 'Descripción 2',
      price: 250,
      stock: 5,
      imgUrl: '',
      category: { id: 'cat-id-2', name: 'Otra Categoria' } as any,
      orderDetails: [],
    },
  ];

  const mockProductRepo: Partial<Repository<Product>> = {
    find: jest.fn().mockResolvedValue(mockProducts),
    create: jest.fn().mockImplementation((dto) => ({ ...dto })),
    save: jest.fn().mockImplementation((product) =>
      Promise.resolve({ id: 'uuid-product', ...product }),
    ),
  };

  const mockCategoryRepo: Partial<Repository<Category>> = {
    findOne: jest.fn().mockResolvedValue({
      id: 'cat-id-1',
      name: 'Mock Categoria',
    }),
  };

  const mockProductsRepository: Partial<ProductsRepository> = {
    seedProducts: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepo,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepo,
        },
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('debe retornar una lista de productos', async () => {
    const result = await service.getAllProducts(1, 5);
    expect(result).toEqual(mockProducts);
    expect(mockProductRepo.find).toHaveBeenCalled();
  });

  it('debe crear un nuevo producto', async () => {
    const dto: CreateProductDto = {
      name: 'Nuevo producto',
      description: 'Descripción del producto',
      price: 500.75,
      stock: 15,
      categoryId: 'cat-id-1',
    };

    const result = await service.createProduct(dto);
    expect(result).toHaveProperty('id', 'uuid-product');
    expect(mockProductRepo.create).toHaveBeenCalled();
    expect(mockProductRepo.save).toHaveBeenCalled();
  });
});
