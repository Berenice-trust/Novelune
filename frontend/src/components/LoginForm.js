"use client";
import { useState } from "react";
import Link from 'next/link';
import { validators } from "../utils/validation";

export default function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ login: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Валидация логина и пароля
    const loginError = login.includes("@")
      ? validators.email.validate(login)
      : validators.username.validate(login);
    const passwordError = !password ? "Пароль обязателен" : "";
    setFieldErrors({ login: loginError || "", password: passwordError });
    if (loginError || passwordError) return;
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/";
      } else {
        setError(data.message || "Ошибка входа");
      }
    } catch {
      setError("Ошибка сети");
    }
  };

  // onBlur-валидация для логина
  const handleLoginBlur = (e) => {
    const value = e.target.value;
    const loginError = value.includes("@")
      ? validators.email.validate(value)
      : validators.username.validate(value);
    setFieldErrors((prev) => ({ ...prev, login: loginError || "" }));
  };

  // onBlur-валидация для пароля
  const handlePasswordBlur = (e) => {
    const value = e.target.value;
    const passwordError = !value ? "Пароль обязателен" : "";
    setFieldErrors((prev) => ({ ...prev, password: passwordError }));
  };

  return (
    <section className="auth-section">
      <h2>Вход в систему</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginInput">Логин или Email</label>
          <input
            id="loginInput"
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
            onBlur={handleLoginBlur}
          />
          {fieldErrors.login && <div className="error-text">{fieldErrors.login}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Пароль</label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
          />
          {fieldErrors.password && <div className="error-text">{fieldErrors.password}</div>}
        </div>
        {error && <div className="error-text">{error}</div>}
        <div className="form-actions">
          <button type="submit" className="button">Войти</button>
        </div>
      </form>
      <div className="auth-links">
        <p>Еще нет аккаунта? <Link href="/register">Зарегистрироваться</Link></p>
        <p><Link href="/">Вернуться на главную</Link></p>
      </div>
    </section>
  );
}