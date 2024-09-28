import { cookies } from 'next/headers';

export default function useServerCookie() {
  const getServerCookie = (name: string) => {
    const cookieStore = cookies();
    return cookieStore.get(name)?.value || null;
  };

  const setServerCookie = (name: string, value: string, options?: any) => {
    const cookieStore = cookies();
    cookieStore.set(name, value, { ...options });
  };

  return { getServerCookie, setServerCookie };
}
