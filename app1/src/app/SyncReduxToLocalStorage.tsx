'use client';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@/store';

export default function SyncReduxToLocalStorage() {
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [token, user]);

  return null;
}
