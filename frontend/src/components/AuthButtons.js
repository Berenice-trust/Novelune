export default function AuthButtons({ variant = "primary" }) {
  let loginClass = "button";
  let registerClass = "button secondary";

  if (variant === "header") {
    loginClass = "button";
    registerClass = "button third";
  }

  return (
    <div className="auth-buttons">
      <a href="/login" className={loginClass}>
        Войти
      </a>
      <a href="/register" className={registerClass}>
        Регистрация
      </a>
    </div>
  );
}