import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as fs from 'fs';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let createdProductId: string;
  let userId: string;
  const testEmail = `nass_e2e2+${Date.now()}@example.com`;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // 1. Signup
  it('POST /auth/signup - should create a user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Nass Tester',
        email: testEmail,
        address: 'Santo Domingo',
        city: 'Santo Domingo',
        country: 'Republica Dominicana',
        phone: 8095551234,
        password: 'Clave123!',
        confirmPassword: 'Clave123!',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(testEmail);
    userId = res.body.id;
  });

  // 2. Login
  it('POST /auth/signin - should return access_token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: testEmail,
        password: 'Clave123!',
      })
      .expect(201); // ← tu backend responde 201

    expect(res.body).toHaveProperty('access_token');
    accessToken = res.body.access_token;
  });

  // 3. Get Products
  it('GET /products - should return products list', async () => {
    const res = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    createdProductId = res.body[0].id;
  });

 // 4. Create Order
it('POST /orders - should create order', async () => {
  const res = await request(app.getHttpServer())
    .post('/orders')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      userId, // ✅ lo mandamos manualmente
      products: [{ id: createdProductId }],
    })
    .expect(201);

  expect(res.body).toHaveProperty('orderId');
  expect(res.body).toHaveProperty('total');
});


  // 5. Upload image
it('POST /files/uploadImage/:id - should upload image and update imgUrl', async () => {
  const imagePath = 'testimage/correr.jpeg';

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Test image not found at: ${imagePath}`);
  }

  const res = await request(app.getHttpServer())
    .post(`/files/uploadImage/${createdProductId}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .attach('image', imagePath) 
    .expect(201);

  expect(res.body).toHaveProperty('imgUrl');
  expect(res.body.imgUrl).toMatch(/^https?:\/\//);
  });
});

