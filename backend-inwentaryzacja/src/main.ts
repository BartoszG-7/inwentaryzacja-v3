import { NestFactory } from '@nestjs/core';
import { LocationModule } from './modules/location/location.module';

async function bootstrap() {
  const app = await NestFactory.create(LocationModule);
  app.enableCors({
    origin: 'http://localhost:4200', // Adjust this to your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
