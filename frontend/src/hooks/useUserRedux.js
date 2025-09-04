// Пример замены useUser hook на Redux
"use client";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { userActions } from '../store/store';

export function useUserRedux() {
  const { data: user, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const fetchAttempted = useRef(false);

  useEffect(() => {
    // Загружаем пользователя только один раз при монтировании
    if (loading && !user && !error && !fetchAttempted.current) {
      fetchAttempted.current = true;
      
      fetch('/api/user/me', { credentials: 'include' })
        .then(res => res.ok ? res.json() : { user: null })
        .then(data => {
          dispatch(userActions.setUser(data.user));
        })
        .catch(err => {
          dispatch(userActions.setError(err.message));
        });
    }
  }, [dispatch, loading, user, error]); // Исправленные зависимости

  const login = (userData) => {
    dispatch(userActions.setUser(userData));
  };

  const logout = () => {
    dispatch(userActions.logout());
  };

  return { user, loading, error, login, logout };
}
