import request from 'supertest';
import { app } from '../../app';

const currentuserUri = '/api/users/currentuser';

describe('Current User', () => {
  it('responds with details about the current user', async () => {
    const { cookie, email } = await global.signin();

    const response = await request(app).get(currentuserUri).set('Cookie', cookie).expect(200);
    expect(response.body.currentUser.email).toEqual(email);
  });

  it('responds with null if not authenticated', async () => {
    const response = await request(app).get(currentuserUri).expect(200);
    expect(response.body.currentUser).toEqual(null);
  });
});
