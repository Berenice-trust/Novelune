import AuthButtons from './AuthButtons';

export default function Header() {
  const user = null; // или объект пользователя, если авторизован

  return (
    <header>
      <div className="container">
        <h1>
          <a href="/">Novelune</a>
        </h1>
        <p>Платформа для публикации и чтения литературных произведений</p>

        <div className="auth-nav">
          <div className="auth-nav-main">
            {user ? (
              <>
                <span>
                  {user.display_name ? user.display_name : user.username}
                </span>
                <a href="/dashboard" className="button header-cabinet-btn">
                  Личный кабинет
                </a>
                <button id="logoutBtn" className="button third">
                  Выйти
                </button>
              </>
            ) : (
              <AuthButtons variant="header" />
            )}
          </div>
          <a href="/books" className="button header-cabinet-btn auth-nav-books-btn">
            Все книги
          </a>
        </div>
      </div>
    </header>
  );
}