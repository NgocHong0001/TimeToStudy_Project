import request from 'supertest';
import mongoose from 'mongoose';
import app from '../schedule.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

beforeAll(async () => {
  // Anslut till testdatabasen
  await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/test_db');

  // Create testuser
  const hashedPassword = await bcrypt.hash('testpass123', 10);

  await User.create({
    username: 'testuser',
    password: hashedPassword,
    firstname: 'Test',
    lastname: 'User',
    isAdmin: false
  });
});

afterAll(async () => {
  // Rensa användare efter testet
  await User.deleteMany({ username: 'testuser' });
  await mongoose.disconnect();
});

describe('POST /api/users/login', () => {
  it('logs in with correct credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'testpass123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('fails login with wrong password', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Wrong password.');
  });
});
