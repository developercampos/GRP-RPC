import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'; // Use a importação padrão
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let repo: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repo = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
  });

  it('/users (POST) - Criar usuário', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ nome: 'Test User', email: 'test@email.com', senha: '123456' })
      .expect(201);
  });

  it('/users (POST) - Criar usuário duplicado (deve falhar)', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({ nome: 'Test User', email: 'test@email.com', senha: '123456' });

    return request(app.getHttpServer())
      .post('/users')
      .send({ nome: 'Test User', email: 'test@email.com', senha: '123456' })
      .expect(400);
  });

  it('/auth/login (POST) - Login bem-sucedido', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@email.com', senha: '123456' })
      .expect(200);
  });

  it('/auth/profile (GET) - Falha sem autenticação', async () => {
    return request(app.getHttpServer()).get('/auth/profile').expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
