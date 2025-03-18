import { NotificationType } from '../dtos/notification.dto';

/**
 * Modelo de dados para notificações
 */
export class Notification {
  id: string;
  userId: string;
  message: string;
  type: NotificationType;
  read: boolean;
  delivered: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Notification>) {
    Object.assign(this, partial);
    this.id = partial.id || generateId();
    this.read = partial.read || false;
    this.delivered = partial.delivered || false;
    this.createdAt = partial.createdAt || new Date();
    this.updatedAt = partial.updatedAt || new Date();
  }
}

/**
 * Gera um ID único para a notificação
 */
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}