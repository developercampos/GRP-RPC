export class UserEventDto {
    id: string;
    name: string;
    email: string;
    action: UserAction;
    timestamp: Date;
    metadata?: Record<string, any>;
  }
  
  /**
   * Ações possíveis nos eventos de usuário
   */
  export enum UserAction {
    CREATED = 'CREATED',
    UPDATED = 'UPDATED',
  }