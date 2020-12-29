import {DocumentBuilder} from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
    .setTitle('task-management')
    .setDescription('The test API description')
    .setVersion('1.0')
    .addTag('test')
    .addBearerAuth()
    .build();