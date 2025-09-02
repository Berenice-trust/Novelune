"use client";
import AuthButtons from './AuthButtons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header({ initialUser }) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (!user) {
      fetch("/api/user/me")
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) setUser(data.user);
        });
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutHandler = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header>
      <div className="container">
        <h1>
          <Link href="/">Novelune</Link>
        </h1>
        <p>Платформа для публикации и чтения литературных произведений</p>

        <div className="auth-nav">
          <div className="auth-nav-main">
            {user ? (
              <>
                <span>
                  {user.display_name ? user.display_name : user.username}
                </span>
                <Link href="/dashboard" className="button header-cabinet-btn">
                  Личный кабинет
                </Link>
                <button
                  id="logoutBtn"
                  className="button third"
                  onClick={logoutHandler}
                >
                  Выйти
                </button>
              </>
            ) : (
              <AuthButtons variant="header" />
            )}
          </div>
          <Link href="/books" className="button header-cabinet-btn auth-nav-books-btn">
            Все книги
          </Link>
        </div>
      </div>
    </header>
  );
}