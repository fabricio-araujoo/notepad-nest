import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ExceptionGlobalFilter } from './core/filters/exception-global/exception-global.filter';
import { ResultInterceptor } from './core/interceptors/result/result.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1/notepad');

  // Habilitando CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL, // Permitindo apenas o frontend Angular
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Métodos permitidos
    credentials: true, // Se você estiver utilizando cookies
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalInterceptors(new ResultInterceptor());
  app.useGlobalFilters(new ExceptionGlobalFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
