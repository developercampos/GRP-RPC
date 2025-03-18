/**
 * DTO para criação de uma notificação
 */
export class CreateNotificationDto {
    userId: string;
    message: string;
    type: NotificationType;
    metadata?: Record<string, any>;
    createdAt?: Date;
  }
  
  /**
   * Tipos de notificação suportados
   */
  export enum NotificationType {
    USER_CREATED = 'USER_CREATED',
    USER_UPDATED = 'USER_UPDATED',
    SYSTEM = 'SYSTEM',
  }