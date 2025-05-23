import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderDetailsModule } from './modules/order-details/order-details.module';
import { CategoriesModule } from './modules/category/categories.module';
import { FilesModule } from './files/files.module';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ...databaseConfig,
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    OrderDetailsModule,
    CategoriesModule,
    FilesModule,
  ],
})
export class AppModule {}
