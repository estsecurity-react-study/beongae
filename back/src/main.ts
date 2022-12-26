import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { UndefinedToNullInterceptor } from './common/interceptors/undefined-to-null.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  // TODO: 설정하면 controller @body 에서 dto 타입 지정시 에러남
  // 설정 안해도 controller 에서 ParseIntPipe 변환 잘됨
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //   }),
  // );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new UndefinedToNullInterceptor(),
  );
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('BEONGAE')
    .setDescription('beongae API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`server listening on port ${PORT}`);
}
bootstrap();
