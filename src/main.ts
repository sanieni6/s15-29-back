import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './config/enviroments';
const port = PORT ?? 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Subastas API')
    .setDescription('Aqui se subastan cosas')
    .setVersion('1.0')
    .addTag('subastas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log('server raised in port: ' + port);
}
bootstrap();
