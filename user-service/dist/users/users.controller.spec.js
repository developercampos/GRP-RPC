"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest")); // Use a importação padrão
const app_module_1 = require("../app.module");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
describe('UsersController (e2e)', () => {
    let app;
    let repo;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const moduleFixture = yield testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        yield app.init();
        repo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(users_entity_1.User));
    }));
    it('/users (POST) - Criar usuário', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app.getHttpServer())
            .post('/users')
            .send({ nome: 'Test User', email: 'test@email.com', senha: '123456' })
            .expect(201);
    }));
    it('/users (POST) - Criar usuário duplicado (deve falhar)', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app.getHttpServer())
            .post('/users')
            .send({ nome: 'Test User', email: 'test@email.com', senha: '123456' });
        return (0, supertest_1.default)(app.getHttpServer())
            .post('/users')
            .send({ nome: 'Test User', email: 'test@email.com', senha: '123456' })
            .expect(400);
    }));
    it('/auth/login (POST) - Login bem-sucedido', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'test@email.com', senha: '123456' })
            .expect(200);
    }));
    it('/auth/profile (GET) - Falha sem autenticação', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app.getHttpServer()).get('/auth/profile').expect(401);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app.close();
    }));
});
