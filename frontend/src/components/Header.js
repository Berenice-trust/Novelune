"use client";
import AuthButtons from './AuthButtons';
import Link from 'next/link';
import { useUser } from '../hooks/useUser';
import Image from 'next/image';

export default function Header() {
  const { user, loading, setUser } = useUser();

  const logoutHandler = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Ошибка выхода:", error);
      // Даже при ошибке очищаем локальное состояние
      setUser(null);
      window.location.href = "/";
    }
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
            {loading ? (
              <span>Загрузка...</span>
            ) : user ? (
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