/**
 * Configuração central da aplicação.
 * Define os valores padrão e exporta variáveis de ambiente mapeadas.
 */
export default () => ({
    environment: process.env.NODE_ENV || 'development',
    server: {
      port: parseInt(process.env.PORT, 10) || 3000,
      host: process.env.HOST || 'localhost',
    },
    rabbitmq: {
      url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
      user: process.env.RABBITMQ_USER || 'guest',
      password: process.env.RABBITMQ_PASSWORD || 'guest',
      notificationQueue: process.env.RABBITMQ_NOTIFICATION_QUEUE || 'notification.queue',
      userCreatedExchange: process.env.RABBITMQ_USER_CREATED_EXCHANGE || 'user.created',
      userUpdatedExchange: process.env.RABBITMQ_USER_UPDATED_EXCHANGE || 'user.updated',
    },
  });