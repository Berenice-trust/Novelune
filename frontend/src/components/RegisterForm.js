"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || (data.errors && Object.values(data.errors).join(", ")) || "Ошибка регистрации");
      } else {
        setSuccess("Регистрация успешна! Проверьте почту для активации.");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError("Ошибка сети");
    }
  };

  return (
    <section className="auth-section">
      <h2>Регистрация</h2>
      <form className="auth-form" id="registerForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usernameInput">Имя пользователя</label>
          <input
            type="text"
            id="usernameInput"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput">Email</label>
          <input
            type="email"
            id="emailInput"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Пароль</label>
          <input
            type="password"
            id="passwordInput"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPasswordInput">Повторите пароль</label>
          <input
            type="password"
            id="confirmPasswordInput"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <div className="form-actions">
          <button type="submit" className="button">Зарегистрироваться</button>
        </div>
      </form>
      <div className="auth-links">
        <p>Уже есть аккаунт? <Link href="/login">Войти</Link></p>
        <p><Link href="/">Вернуться на главную</Link></p>
      </div>
    </section>
  );
}