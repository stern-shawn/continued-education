import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';
import { signupUri } from '../routes/__test__/signup.test';

declare global {
  namespace NodeJS {
    interface Global {
      signin: () => Promise<{ cookie: string[]; email: string; password: string }>;
    }
  }
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'workaround for testing';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app).post(signupUri).send({ email, password }).expect(201);
  // Supertest doesn't automatically manage cookies for us like browsers or postman does, we'll need
  // to capture it and manually append to requests to mimic working cookies :)
  const cookie = response.get('Set-Cookie');

  return { cookie, email, password };
};
