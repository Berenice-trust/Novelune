"use client";
import { useState, useEffect, useCallback } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Функция для ручного обновления пользователя
  const fetchUser = useCallback(() => {
    setLoading(true);
    fetch('/api/user/me', { credentials: 'include' })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          // Неавторизован - это нормально
          return { user: null };
        } else {
          throw new Error('Network error');
        }
      })
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log('User fetch error:', error);
        setUser(null);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Теперь возвращаем refetch для ручного обновления
  return { user, loading, setUser, refetch: fetchUser };
}