import { ConfigService } from '@nestjs/config';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';

/**
 * Configuração do RabbitMQ para o microserviço
 * Permite a conexão com o RabbitMQ para publicação e consumo de mensagens
 */
export const getRabbitMQConfig = (
  configService: ConfigService,
  name: string | symbol = 'NOTIFICATION_SERVICE',
): ClientProviderOptions => {
  const user = configService.get<string>('RABBITMQ_USER');
  const password = configService.get<string>('RABBITMQ_PASSWORD');
  const host = configService.get<string>('RABBITMQ_URL');
  
  // Formatar a URL com credenciais incorporadas
  // Se a URL já estiver no formato correto, extrair apenas o host
  const formattedUrl = host.includes('amqp://') 
    ? `amqp://${user}:${password}@${host.replace('amqp://', '')}`
    : `amqp://${user}:${password}@${host}`;

  return {
    name,
    transport: Transport.RMQ,
    options: {
      urls: [formattedUrl],
      queue: configService.get<string>('RABBITMQ_NOTIFICATION_QUEUE'),
      queueOptions: {
        durable: true, // Garante que a fila persista após reinicialização do broker
      },
    },
  };
};