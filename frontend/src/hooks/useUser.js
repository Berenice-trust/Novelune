"use client";
import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return { user, loading, setUser };
}
