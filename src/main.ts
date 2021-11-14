import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session')
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['randomString']
  }))

  const config = new DocumentBuilder()
    .setTitle('CRUD Project')
    .setDescription('API to write posts')
    .setVersion('1.0')
    .addTag('Posts API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
