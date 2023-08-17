import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('File Upload Module')
    .setDescription(`<h4>This is File Upload module ( common functionalities ) project.</h4><p>Contains features : <li>Single File Upload</li><li>Multiple Files Upload</li><li>Large files upload in chunks</li></p>`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();
