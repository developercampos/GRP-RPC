import { Body, Controller, Post, Get, Param, Logger } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../dtos/notification.dto';
import { Notification } from '../models/notification.model';

/**
 * Controller para endpoints da API de notificações
 */
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   * Endpoint para criar uma nova notificação via API REST
   * @param createNotificationDto DTO com dados da notificação
   */
  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
    return this.notificationService.createNotification(createNotificationDto);
  }

  /**
   * Endpoint para buscar notificações (exemplo simplificado)
   * Em uma implementação real, seria conectado a um banco de dados
   */
  @Get('user/:userId')
  async getNotificationsByUser(@Param('userId') userId: string): Promise<{ message: string }> {
    // Simulação - em um caso real buscaria do banco de dados
    return { message: `Endpoint para buscar notificações do usuário ${userId}` };
  }
}