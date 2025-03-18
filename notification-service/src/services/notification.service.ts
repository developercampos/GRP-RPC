import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreateNotificationDto, NotificationType } from '../dtos/notification.dto';
import { Notification } from '../models/notification.model';
import { UserEventDto, UserAction } from '../dtos/user.dto';
import { getRabbitMQConfig } from '../config/rabbitmq.config';

/**
 * Serviço responsável por gerenciar notificações
 */
@Injectable()
export class NotificationService {
  private client: ClientProxy;
  
  constructor(
    private readonly configService: ConfigService,
     @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {
    // Inicializa o cliente RabbitMQ com as configurações
    this.client = ClientProxyFactory.create(getRabbitMQConfig(configService));
  }

  /**
   * Cria uma nova notificação
   * @param createNotificationDto DTO com dados da notificação
   */
  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    this.logger.info('Creating notification', { notification: createNotificationDto });
    
    const notification = new Notification({
      userId: createNotificationDto.userId,
      message: createNotificationDto.message,
      type: createNotificationDto.type,
      metadata: createNotificationDto.metadata,
    });
    
    // Aqui você poderia persistir a notificação em um banco de dados
    
    // Envia a notificação para o RabbitMQ
    this.sendNotification(notification);
    
    return notification;
  }

  /**
   * Envia uma notificação para o RabbitMQ
   * @param notification Notificação a ser enviada
   */
  async sendNotification(notification: Notification): Promise<void> {
    try {
      this.logger.debug('Sending notification to queue', { notification });
      
      // Emite evento para a exchange apropriada
      await this.client.emit('notifications', notification).toPromise();
      
      notification.delivered = true;
      notification.updatedAt = new Date();
      
      this.logger.info('Notification sent successfully', { notificationId: notification.id });
    } catch (error) {
      this.logger.error('Failed to send notification', { 
        notificationId: notification.id, 
        error: error.message,
        stack: error.stack 
      });
      throw error;
    }
  }

  /**
   * Processa evento de usuário criado
   * @param userEvent Dados do evento de usuário
   */
  async processUserCreatedEvent(userEvent: UserEventDto): Promise<void> {
    this.logger.info('Processing user created event', { userId: userEvent.id });
    
    await this.createNotification({
      userId: userEvent.id,
      message: `Usuário ${userEvent.name} foi criado com sucesso`,
      type: NotificationType.USER_CREATED,
      metadata: {
        email: userEvent.email,
        timestamp: userEvent.timestamp,
      },
    });
  }

  /**
   * Processa evento de usuário atualizado
   * @param userEvent Dados do evento de usuário
   */
  async processUserUpdatedEvent(userEvent: UserEventDto): Promise<void> {
    this.logger.info('Processing user updated event', { userId: userEvent.id });
    
    await this.createNotification({
      userId: userEvent.id,
      message: `Usuário ${userEvent.name} foi atualizado`,
      type: NotificationType.USER_UPDATED,
      metadata: {
        email: userEvent.email,
        timestamp: userEvent.timestamp,
      },
    });
  }
}