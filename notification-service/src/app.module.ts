import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './modules/notification.module';
import appConfig from './config/app.config';

/**
 * Módulo raiz da aplicação
 */
@Module({
  imports: [
    // Carrega configurações de ambiente
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    
    // Módulo de notificações
    NotificationModule,
  ],
})
export class AppModule {}