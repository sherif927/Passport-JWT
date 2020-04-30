const request = require('supertest');
const app = require('../app');
const { User } = require('../models/user');

const users = [
  {
    name: 'Sherif Amr',
    age: 24,
    email: 'sherif.amr.927@gmail.com',
    password: 'Aa123456@',
    gender: 'male',
    country: 'Egypt',
    phoneNumber: '+201119522359'
  },
  {
    name: 'Omnia Kamal',
    age: 25,
    email: 'omnia.kamal.95@gmail.com',
    password: 'Aa123456@',
    gender: 'female',
    country: 'Egypt',
    phoneNumber: '+201119522359'
  },
  {
    name: 'Mohamed Amr',
    age: 36,
    email: 'mohamed.amr.83@gmail.com',
    password: 'Aa123456@',
    gender: 'male',
    country: 'Egypt',
    phoneNumber: '+201119522359'
  }
];

beforeEach(async () => {
  await User.deleteMany();
  await User.insertMany([users[1], users[2]]);
})


test('Should register a new user', async () => {
  let response = await request(app)
    .post('/users/register')
    .send(users[0])
    .expect(200);

  expect(response.body.token)
    .not
    .toBeNull();
});

test('Should not register a user with an already existing email', async () => {
  await request(app)
    .post('/users/register')
    .send(users[1])
    .expect(500);
});

test('Should login in a user', async () => {
  let response = await request(app)
    .post('/auth/login')
    .send({ email: users[1].email, password: users[1].password })
    .expect(200);

  expect(response.body.token)
    .not
    .toBeNull();
});

test('Should not login in a user with non existant credentials', async () => {
  await request(app)
    .post('/auth/login')
    .send({ email: users[0].email, password: users[0].password })
    .expect(500);
});

test('Should block unauthorized users from protected routes', async () => {
  await request(app)
    .get('/users/me')
    .send({ email: users[1].email, password: users[1].password })
    .expect(401);
});