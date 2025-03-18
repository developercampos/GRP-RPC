import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

/**
 * Função principal para iniciar o serviço
 */
async function bootstrap() {
  // Cria a aplicação NestJS
  const app = await NestFactory.create(AppModule);
  
  // Usa o logger Winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  // Configura validação global de DTOs
  app.useGlobalPipes(new ValidationPipe());
  
  const configService = app.get(ConfigService);
  
  // Configura conexão com RabbitMQ para receber mensagens
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('rabbitmq.url')],
      queue: configService.get<string>('rabbitmq.notificationQueue'),
      queueOptions: {
        durable: true,
      },
      noAck: false, // Ativa acknowledgement manual
      prefetchCount: 1, // Número de mensagens que podem ser processadas simultaneamente
    },
  });
  
  // Inicia os microserviços
  await app.startAllMicroservices();
  
  // Define prefixo global para API REST
  app.setGlobalPrefix('api');
  
  // Inicia o servidor HTTP
  const port = configService.get<number>('server.port');
  await app.listen(port);
  
  console.log(`NotificationService is running on port ${port}`);
}

// Inicia a aplicação
bootstrap();