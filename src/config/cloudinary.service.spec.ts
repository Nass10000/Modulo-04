import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service';
import { v2 as cloudinary } from 'cloudinary';

jest.mock('cloudinary');

describe('CloudinaryService', () => {
  let service: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryService],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
  });

  it('debería subir una imagen correctamente', async () => {
    const mockFile = {
      buffer: Buffer.from('mock image'),
      mimetype: 'image/jpeg',
      originalname: 'test.jpg',
    } as Express.Multer.File;

    const mockResult = {
      secure_url: 'https://mock.cloudinary.com/image.jpg',
    };

    cloudinary.uploader.upload_stream = jest.fn((_, callback) => {
      callback(null, mockResult);
      return { end: jest.fn() };
    }) as any;

    const result = await service.uploadImage(mockFile);
    expect(result.secure_url).toBe(mockResult.secure_url);
  });

  it('debería lanzar error si la subida falla', async () => {
    const mockFile = {
      buffer: Buffer.from('mock image'),
      mimetype: 'image/jpeg',
      originalname: 'test.jpg',
    } as Express.Multer.File;

    cloudinary.uploader.upload_stream = jest.fn((_, callback) => {
      callback(new Error('Upload failed'), null); 
      return { end: jest.fn() };
    }) as any;

    await expect(service.uploadImage(mockFile)).rejects.toThrow('Upload failed');
  });
});
