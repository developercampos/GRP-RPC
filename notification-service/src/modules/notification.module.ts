import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { NotificationController } from '../controllers/notification.controller';
import { NotificationService } from '../services/notification.service';
import { RabbitMQListener } from '../providers/rabbitmq.listener';
import { loggerConfig } from '../config/logger.config';
import { getRabbitMQConfig } from '../config/rabbitmq.config';

/**
 * Módulo principal para o serviço de notificações
 */
@Module({
  imports: [
    // Configuração do Winston para logs estruturados
    WinstonModule.forRoot(loggerConfig),
    
    // Carrega variáveis de ambiente
    ConfigModule,
    
    // Configuração dos clientes RabbitMQ
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATION_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => getRabbitMQConfig(configService),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, RabbitMQListener],
})
export class NotificationModule {}