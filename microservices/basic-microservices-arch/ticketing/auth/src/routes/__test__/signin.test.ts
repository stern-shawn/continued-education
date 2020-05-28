import request from 'supertest';
import { app } from '../../app';
import { signupUri } from './signup.test';

const signinUri = '/api/users/signin';
const email = 'test@test.com';
const password = 'password';

const invalidPassword = 'p';

describe('Signin', () => {
  it('fails when a nonexistent email is provided', async () => {
    await request(app).post(signinUri).send({ email, password }).expect(400);
  });

  it('fails when an incorrect password is supplied', async () => {
    await request(app).post(signupUri).send({ email, password }).expect(201);
    await request(app).post(signinUri).send({ email, password: invalidPassword }).expect(400);
  });

  it('sets a cookie when given valid credentials', async () => {
    await request(app).post(signupUri).send({ email, password }).expect(201);
    const response = await request(app).post(signinUri).send({ email, password }).expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
