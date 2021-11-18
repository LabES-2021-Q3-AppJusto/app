jest.mock('@sentry/react-native', () => ({ init: () => jest.fn() }));
jest.mock('expo-location', () => ({
  init: () => jest.fn(),
}));
jest.mock('firebase', () => ({
  init: () => jest.fn(),
  initializeApp: () => jest.fn(),
  auth: () => jest.fn(),
  firestore: () => jest.fn(),
  functions: () => jest.fn(),
}));

jest.mock('@expo', () => ({
  init: () => jest.fn(),
}));

// addEventListener = jest.fn();
// attachEvent = jest.fn();
