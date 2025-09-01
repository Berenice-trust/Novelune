import Link from 'next/link';


export default function AuthButtons({ variant = "primary" }) {
  let loginClass = "button";
  let registerClass = "button secondary";

  if (variant === "header") {
    loginClass = "button";
    registerClass = "button third";
  }

  return (
    <div className="auth-buttons">
      <Link href="/login" className={loginClass}>
        Войти
      </Link>
      <Link href="/register" className={registerClass}>
        Регистрация
      </Link>
    </div>
  );
}