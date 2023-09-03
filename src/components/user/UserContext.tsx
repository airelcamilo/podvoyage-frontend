import ChildrenProps from '@/interface/types/ChildrenProps';
import { createContext, useContext, useEffect, useState } from 'react';
import { UserData, DEFAULT_USER } from '@/interface/types/UserData';
import { authenticatedFetch } from '@/utils/AuthenticatedFetch';
import { setCookie } from 'nookies';
import { useRouter, usePathname } from 'next/navigation';
import UnauthenticatedComponent from './UnauthenticatedComponent';

interface UserValidateData {
  user: UserData | undefined;
  token: string;
  isAuthenticated: boolean;
  validate: (token: string) => Promise<void>;
  authFetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
  logout: (token: string) => Promise<void>;
}

export const UserContext = createContext<UserValidateData>(
  {} as UserValidateData
);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<ChildrenProps> = ({
  children
}) => {
  const [user, setUser] = useState<UserData>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const authFetch = authenticatedFetch;

  const updateToken = (token: string) => {
    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = async (token: string) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }
    );

    if (response.status == 200) {
      updateToken('');
      setUser(DEFAULT_USER);
      setIsAuthenticated(false);
      router.replace('/');
    }
  };

  const validate = async (token: string) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_POD_API_URL +
      '/api/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }
    );

    if (response.status == 200) {
      const data: UserData = await response.json();
      localStorage.setItem('token', token);
      updateToken(token);
      setUser(data);
      setIsAuthenticated(true);
    } else {
      updateToken('');
      setUser(DEFAULT_USER);
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token') ?? '';
    setToken(token);
    if (token) {
      validate(token);
    }
  }, []);

  if (!isAuthenticated && (pathname != '/login' && pathname != '/register')) {
    return (
      <main>
        <UnauthenticatedComponent />
      </main>
    )
  }

  return (
    <UserContext.Provider
      value={{
        user, token, isAuthenticated, validate, authFetch, logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
