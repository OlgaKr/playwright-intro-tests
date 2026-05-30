export const mockedProfile = {
  userId: 1,
  photoFilename: 'default-user.png',
  name: 'Mocked',
  lastName: 'User',
};

export const validCar = {
  carBrandId: 1,
  carModelId: 1,
  mileage: 122,
};

export const expectedCreatedCar = {
  carBrandId: validCar.carBrandId,
  carModelId: validCar.carModelId,
  initialMileage: validCar.mileage,
  mileage: validCar.mileage,
  brand: 'Audi',
  model: 'TT',
};

export const carWithoutModelId = {
  carBrandId: 1,
  mileage: 122,
};

export const carWithTooHighMileage = {
  carBrandId: 1,
  carModelId: 1,
  mileage: 1000000,
};

export const carApiErrorMessages = {
  carModelIdRequired: 'Car model id is required',
  mileageOutOfRange: 'Mileage has to be from 0 to 999999',
};