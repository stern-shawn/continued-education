import request from 'supertest';
import { app } from '../../app';
import { signupUri } from './signup.test';

const currentuserUri = '/api/users/currentuser';
const email = 'test@test.com';
const password = 'password';

describe('Current User', () => {
  it('responds with details about the current user', async () => {
    const authResponse = await request(app).post(signupUri).send({ email, password }).expect(201);
    // Supertest doesn't automatically manage cookies for us like browsers or postman does, we'll need
    // to capture it and manually append to requests to mimic working cookies :)
    const cookie = authResponse.get('Set-Cookie');

    const response = await request(app).get(currentuserUri).set('Cookie', cookie).expect(200);
    expect(response.body.currentUser.email).toEqual(email);
  });
});
