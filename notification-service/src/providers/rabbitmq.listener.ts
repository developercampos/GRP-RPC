import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationService } from '../services/notification.service';
import { UserEventDto, UserAction } from '../dtos/user.dto';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

/**
 * Serviço para escutar mensagens do RabbitMQ
 */
@Injectable()
export class RabbitMQListener {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  /**
   * Processa eventos de usuário criado
   * @param data Payload do evento
   * @param context Contexto RabbitMQ
   */
  @EventPattern('user.created')
  async handleUserCreated(
    @Payload() data: UserEventDto,
    @Ctx() context: RmqContext,
  ) {
    this.logger.info('Received user.created event', { userId: data.id });
    
    try {
      // Verifica se é realmente um evento de criação
      if (data.action === UserAction.CREATED) {
        await this.notificationService.processUserCreatedEvent(data);
      }
      
      // Confirma o processamento da mensagem
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
      
      this.logger.debug('Processed user.created event successfully', { userId: data.id });
    } catch (error) {
      this.logger.error('Error processing user.created event', { 
        userId: data.id, 
        error: error.message,
        stack: error.stack 
      });
      
      // No caso de erro, você pode rejeitar a mensagem ou implementar uma lógica de retry
      throw error;
    }
  }

  /**
   * Processa eventos de usuário atualizado
   * @param data Payload do evento
   * @param context Contexto RabbitMQ
   */
  @EventPattern('user.updated')
  async handleUserUpdated(
    @Payload() data: UserEventDto,
    @Ctx() context: RmqContext,
  ) {
    this.logger.info('Received user.updated event', { userId: data.id });
    
    try {
      // Verifica se é realmente um evento de atualização
      if (data.action === UserAction.UPDATED) {
        await this.notificationService.processUserUpdatedEvent(data);
      }
      
      // Confirma o processamento da mensagem
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
      
      this.logger.debug('Processed user.updated event successfully', { userId: data.id });
    } catch (error) {
      this.logger.error('Error processing user.updated event', { 
        userId: data.id, 
        error: error.message,
        stack: error.stack 
      });
      
      // No caso de erro, você pode rejeitar a mensagem ou implementar uma lógica de retry
      throw error;
    }
  }
}