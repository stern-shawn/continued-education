import request from 'supertest';
import { app } from '../../app';

export const signupUri = '/api/users/signup';
const email = 'test@test.com';
const password = 'password';

const invalidEmail = 'nowayman';
const invalidPassword = 'p';

describe('Signup', () => {
  it('returns a 201 on successful signup', async () => {
    await request(app).post(signupUri).send({ email, password }).expect(201);
  });

  it('returns a 400 for invalid email', async () => {
    await request(app).post(signupUri).send({ email: invalidEmail, password }).expect(400);
  });

  it('returns a 400 for invalid password', async () => {
    await request(app).post(signupUri).send({ email, password: invalidPassword }).expect(400);
  });

  it('returns a 400 for missing email and password', async () => {
    await request(app).post(signupUri).send({}).expect(400);
    await request(app).post(signupUri).send({ email }).expect(400);
    await request(app).post(signupUri).send({ password: invalidPassword }).expect(400);
  });

  it('disallows duplicate emails', async () => {
    await request(app).post(signupUri).send({ email, password }).expect(201);
    await request(app).post(signupUri).send({ email, password }).expect(400);
  });

  it('sets a cookie after successful signup', async () => {
    const response = await request(app).post(signupUri).send({ email, password }).expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
