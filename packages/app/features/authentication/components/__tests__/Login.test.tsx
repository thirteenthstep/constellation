import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TamaguiProvider} from '@tamagui/core';
import '@testing-library/jest-native';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import {Provider} from 'react-redux';

import appConfig from '@constellation/web/src/tamagui.config';

import {api} from '../../../../service/api/baseApi';
import {authenticationSlice} from '../../service/store/authenticationSlice';
import {Login} from '../Login';

jest.mock('../../../../environment', () => ({
  ENDPOINT_URL: 'https://test.academy',
}));

export const mockStore = configureStore({
  reducer: combineReducers({
    [api.reducerPath]: api.reducer,
    [authenticationSlice.reducerPath]: authenticationSlice.reducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

const renderWithProviders = () => {
  render(
    <TamaguiProvider config={appConfig}>
      <Provider store={mockStore}>
        <Login />
      </Provider>
    </TamaguiProvider>,
  );
};

describe('Login Component', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
    fetchMock.mockIf(
      'https://constellation.academy/wp-content/uploads/2023/10/constellation-academy-logo.svg',
      () =>
        Promise.resolve({
          status: 200,
          body: '<svg></svg>',
        }),
    );
    fetchMock.mockIf('https://test.academy', () =>
      Promise.resolve({
        status: 200,
        body: '',
      }),
    );
  });

  beforeEach(() => {
    fetchMock.mockIf(
      'https://constellation.academy/wp-content/uploads/2023/10/constellation-academy-logo.svg',
      () =>
        Promise.resolve({
          status: 200,
          body: '<svg></svg>',
        }),
    );
    fetchMock.mockIf('https://test.academy', () =>
      Promise.resolve({
        status: 200,
        body: '',
      }),
    );
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the component', () => {
    renderWithProviders();

    expect(screen.getByPlaceholderText('Email')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Password')).toBeOnTheScreen();
    expect(screen.getByText('Login')).toBeOnTheScreen();
  });

  it('displays validation errors on empty submit', async () => {
    renderWithProviders();

    fireEvent.changeText(screen.getByPlaceholderText('Email'), {
      target: {value: ''},
    });
    fireEvent.changeText(screen.getByPlaceholderText('Password'), {
      target: {value: ''},
    });
    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeOnTheScreen();
      expect(
        screen.getByText('String must contain at least 4 character(s)'),
      ).toBeOnTheScreen();
    });
  });

  it('submits form with valid data', async () => {
    render(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    );

    fireEvent.changeText(screen.getByPlaceholderText('Email'), {
      target: {value: 'test@example.com'},
    });
    fireEvent.changeText(screen.getByPlaceholderText('Password'), {
      target: {value: 'password123'},
    });

    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.queryByText('Invalid email')).not.toBeOnTheScreen();
      expect(screen.queryByText('Password is too short')).not.toBeOnTheScreen();
    });
  });

  it('shows loading spinner and disables button on submit', async () => {
    render(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    );

    fireEvent.changeText(screen.getByPlaceholderText('Email'), {
      target: {value: 'test@example.com'},
    });
    fireEvent.changeText(screen.getByPlaceholderText('Password'), {
      target: {value: 'password123'},
    });

    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('Login.Button.Submit')).toBeDisabled();
      expect(screen.getByTestId('Login.Spinner')).toBeOnTheScreen();
    });
  });
});
