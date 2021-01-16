import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user-1223',
        name: 'Emanuele Correa',
        email: 'manu@exemple.com.br',
      },
      token: 'ewnlzx2jlejle789e3m7oç',
    };
  
    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'manu@exemple.com.br',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token', 
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user', 
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('manu@exemple.com.br');
});

it('should restore saved data from storage when auth inits', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
    switch (key) {
      case '@GoBarber:token':
        return 'ewnlzx2jlejle789e3m7oç';
      case '@GoBarber:user':
        return JSON.stringify({
          id: 'user-1223',
          name: 'Emanuele Correa',
          email: 'manu@exemple.com.br',
        });
      default:
        return null;
    }
  });

  const { result } = renderHook(() => useAuth(), {
    wrapper: AuthProvider,
  });

  expect(result.current.user.email).toEqual('manu@exemple.com.br');
});

it('should be able to sign out', async () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
    switch (key) {
      case '@GoBarber:token':
        return 'ewnlzx2jlejle789e3m7oç';
      case '@GoBarber:user':
        return JSON.stringify({
          id: 'user-1223',
          name: 'Emanuele Correa',
          email: 'manu@exemple.com.br',
        });
      default:
        return null;
    }
  });

  const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user-1223',
      name: 'Emanuele Correa',
      email: 'manu@exemple.com.br',
      avatar_url: 'image-test.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});


