import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Redis from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('FBI Wanted API Proxy')
    .setDescription('API that proxies and filters data from the FBI Wanted API')
    .setVersion('1.0')
    .addTag('wanted')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  const redis = new Redis(); // defaults to localhost:6379

  redis
    .ping()
    .then((res) => {
      console.log('🔌 Redis connected:', res); // should print 'PONG'
    })
    .catch((err) => {
      console.error('❌ Redis connection failed:', err.message);
    });
}
bootstrap();
