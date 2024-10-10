// tests/api.test.ts
import { test, expect } from '@playwright/test';
import { ApiHelper } from '../helpers/ApiHelper'; // Import the helper class from helper folder

test.describe('API Tests for Reqres', () => {
  let apiHelper: ApiHelper;

  // Initialize ApiHelper before each test
  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request, 'https://reqres.in/api');
  });

  test('GET list of users', async () => {
    const response = await apiHelper.get('/users?page=2');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.page).toBe(2);
    expect(responseBody.data.length).toBeGreaterThan(0);
  });

  test('GET single user', async () => {
    const response = await apiHelper.get('/users/2');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.data.id).toBe(2);
  });

  test('GET single user not found', async () => {
    const response = await apiHelper.get('/users/23');
    expect(response.status()).toBe(404);
  });

  test('POST create new user', async () => {
    const response = await apiHelper.post('/users', {
      name: 'John Doe',
      job: 'leader',
    });
    expect(response.status()).toBe(201);
    const user = await response.json();
    expect(user.name).toBe('John Doe');
    expect(user.job).toBe('leader');
  });

  test('PUT update user', async () => {
    const response = await apiHelper.put('/users/2', {
      name: 'Jane Doe',
      job: 'developer',
    });
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.name).toBe('Jane Doe');
    expect(user.job).toBe('developer');
  });

  test('DELETE user', async () => {
    const response = await apiHelper.delete('/users/2');
    expect(response.status()).toBe(204); // No Content
  });

  test('POST register successful', async () => {
    const response = await apiHelper.post('/register', {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.token).toBeDefined();
  });

  test('POST register unsuccessful', async () => {
    const response = await apiHelper.post('/register', {
      email: 'sydney@fife',
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });

  test('POST login successful', async () => {
    const response = await apiHelper.post('/login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeDefined();
  });

  test('POST login unsuccessful', async () => {
    const response = await apiHelper.post('/login', {
      email: 'peter@klaven',
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });
});
