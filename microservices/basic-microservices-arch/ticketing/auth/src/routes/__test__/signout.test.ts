import request from 'supertest';
import { app } from '../../app';
import { signupUri } from './signup.test';

const signoutUrl = '/api/users/signout';
const email = 'test@test.com';
const password = 'password';

describe('Signout', () => {
  it('clears the cookie after signing out', async () => {
    await request(app).post(signupUri).send({ email, password }).expect(201);
    const response = await request(app).post(signoutUrl).send({}).expect(200);

    expect(response.get('Set-Cookie')[0]).toEqual(
      'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
  });
});
