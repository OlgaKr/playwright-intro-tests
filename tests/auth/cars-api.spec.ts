import { expect, test } from '@playwright/test';
import {
  carApiErrorMessages,
  carWithTooHighMileage,
  carWithoutModelId,
  expectedCreatedCar,
  validCar,
} from '../../test-data/networkAndApiData';

test.describe('POST /api/cars', () => {
  const createdCarIds: number[] = [];

  test.afterEach(async ({ request }) => {
    for (const carId of createdCarIds.splice(0)) {
      await request.delete(`/api/cars/${carId}`);
    }
  });

  test('creates a car with valid data', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: validCar,
    });
    const body = await response.json();

    if (body.data?.id) {
      createdCarIds.push(body.data.id);
    }

    expect([200, 201]).toContain(response.status());

    expect(body.status).toBe('ok');
    expect(body.data).toMatchObject(expectedCreatedCar);
    expect(body.data.id).toEqual(expect.any(Number));
  });

  test('does not create a car without required carModelId', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: carWithoutModelId,
    });
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.status).toBe('error');
    expect(body.message).toBe(carApiErrorMessages.carModelIdRequired);
  });

  test('does not create a car with mileage greater than allowed', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: carWithTooHighMileage,
    });
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.status).toBe('error');
    expect(body.message).toBe(carApiErrorMessages.mileageOutOfRange);
  });
});