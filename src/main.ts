import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe, BadRequestException } from '@nestjs/common';


// 🔹 Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(loggerGlobal);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          alert: 'Se han detectado los siguientes errores en la petición',
          errors: cleanErrors,
        });
      },
    }),
  );


  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-commerce Backend API')
    .setDescription('Esta es una API construida con NestJS para el módulo 4 de la carrera Fullstack')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document); // URL: http://localhost:3000/api

  // 🟢 Ejecutamos servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
