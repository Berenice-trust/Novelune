"use client";
import { useState } from "react";
import Link from 'next/link';

export default function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Пароль</label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
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