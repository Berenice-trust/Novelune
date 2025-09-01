import AuthButtons from './AuthButtons';
import Link from 'next/link';

export default function Header() {
  const user = null; // или объект пользователя, если авторизован

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
                <button id="logoutBtn" className="button third">
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