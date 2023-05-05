import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/user/dto/createUser.dto';
import { LoginUserDto } from '../src/auth/dto/loginUser.dto';
import { UserAndTokenResponse } from '../src/auth/types/userAndTokenResponse';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdUserId: number;
    let createdUserToken: string;
    let createdUserRefreshToken: string;
    let adminAccessToken: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();
    });

    describe('AuthController /auth (e2e)', () => {
        const createUserDto: CreateUserDto = {
            email: 'some-email@mail.com',
            name: 'егор',
            password: 'some-password',
        };
        const failCreateUserDto: CreateUserDto = {
            email: 'some-email',
            name: 'ег',
            password: 'som',
        };
        const loginAdminDto: LoginUserDto = {
            email: 'alexeevandre@gmail.com',
            password: 'bonbaroN1998307!',
        };
        it('/auth/signup (POST) - success', () => {
            return request(app.getHttpServer())
                .post('/auth/signup')
                .send(createUserDto)
                .expect(201)
                .then(({ body }: request.Response) => {
                    createdUserId = (body as UserAndTokenResponse).user.id;
                    createdUserToken = (body as UserAndTokenResponse).tokens.accessToken;
                    createdUserRefreshToken = (body as UserAndTokenResponse).tokens.refreshToken;
                    expect(createdUserId).toBeDefined();
                    expect(createdUserToken).toBeDefined();
                    expect(createdUserRefreshToken).toBeDefined();
                });
        });
        it('/auth/signup (POST) - fail user Already Exist', () => {
            return request(app.getHttpServer())
                .post('/auth/signup')
                .send(createUserDto)
                .expect(422)
                .then(({ body }: request.Response) => {
                    expect(body).toStrictEqual({
                        statusCode: 422,
                        message: 'Пользователь с email: some-email@mail.com уже существует',
                    });
                });
        });
        it('/auth/signup (POST) - fail user Not Found', () => {
            return request(app.getHttpServer())
                .post('/auth/signup')
                .send({ email: 'test-email@gmail.com', name: 'Egor' })
                .expect(404)
                .then(({ body }: request.Response) => {
                    expect(body).toStrictEqual({
                        statusCode: 404,
                        message: 'Пользователя с таким email или паролем не существует',
                    });
                });
        });
        it('/auth/signup (POST) - fail validation', () => {
            return request(app.getHttpServer())
                .post('/auth/signup')
                .send(failCreateUserDto)
                .expect(400)
                .then(({ body }: request.Response) => {
                    expect(body).toBeDefined();
                    expect(body).toHaveProperty('error');
                    expect(body).toHaveProperty('message');
                    expect(body.message).toHaveLength(3);
                    expect(body).toHaveProperty('statusCode');
                });
        });
        it('/auth/signin (POST)', () => {
            return request(app.getHttpServer())
                .post('/auth/signin')
                .send(loginAdminDto)
                .expect(201)
                .then(({ body }: request.Response) => {
                    adminAccessToken = (body as UserAndTokenResponse).tokens.accessToken;
                    expect(adminAccessToken).toBeDefined();
                });
        });
        it('/auth/refresh (PATCH)', () => {
            return request(app.getHttpServer())
                .patch('/auth/refresh')
                .auth(createdUserRefreshToken, { type: 'bearer' })
                .expect(200)
                .then(({ body }: request.Response) => {
                    expect(body as UserAndTokenResponse).toBeDefined();
                });
        });
        it('/auth/logout (PATCH)', () => {
            return request(app.getHttpServer())
                .patch('/auth/logout')
                .auth(createdUserToken, { type: 'bearer' })
                .expect(200)
                .then(({ body }: request.Response) => {
                    expect(body as UserAndTokenResponse).toBeDefined();
                });
        });
    });

    describe('UserController /user (e2e)', () => {
        it('/user/:id (DELETE)', () => {
            return request(app.getHttpServer())
                .delete('/user/' + createdUserId)
                .auth(adminAccessToken, { type: 'bearer' })
                .expect(200)
                .then(({ body }: request.Response) => {
                    expect(body.id).toBeDefined();
                });
        });
    });
});
