"use client";
import { useState } from "react";
import Link from "next/link";
import { validateUser, validators } from "../utils/validation";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Валидация всех полей
    const usernameError = validators.username.validate(username);
    const emailError = validators.email.validate(email);
    const passwordError = validators.password.validate(password);
    const confirmPasswordError = password !== confirmPassword ? "Пароли не совпадают" : "";
    setFieldErrors({
      username: usernameError || "",
      email: emailError || "",
      password: passwordError || "",
      confirmPassword: confirmPasswordError
    });
    if (usernameError || emailError || passwordError || confirmPasswordError) return;

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
        setFieldErrors({ username: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (err) {
      setError("Ошибка сети");
    }
  };

  // onBlur-валидация для каждого поля
  const handleUsernameBlur = (e) => {
    const value = e.target.value;
    const usernameError = validators.username.validate(value);
    setFieldErrors((prev) => ({ ...prev, username: usernameError || "" }));
  };
  const handleEmailBlur = (e) => {
    const value = e.target.value;
    const emailError = validators.email.validate(value);
    setFieldErrors((prev) => ({ ...prev, email: emailError || "" }));
  };
  const handlePasswordBlur = (e) => {
    const value = e.target.value;
    const passwordError = validators.password.validate(value);
    setFieldErrors((prev) => ({ ...prev, password: passwordError || "" }));
  };
  const handleConfirmPasswordBlur = (e) => {
    const value = e.target.value;
    const confirmPasswordError = value !== password ? "Пароли не совпадают" : "";
    setFieldErrors((prev) => ({ ...prev, confirmPassword: confirmPasswordError }));
  };

  return (
    <section className="auth-section">
      <h2>Регистрация</h2>
      {success ? (
        <div className="success" style={{marginTop: 32, marginBottom: 32, textAlign: 'center'}}>
          {success}
        </div>
      ) : (
        <>
          <form className="auth-form" id="registerForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usernameInput">Имя пользователя</label>
              <input
                type="text"
                id="usernameInput"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={handleUsernameBlur}
                autoFocus
              />
              {fieldErrors.username && <div className="error">{fieldErrors.username}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">Email</label>
              <input
                type="email"
                id="emailInput"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
              />
              {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Пароль</label>
              <input
                type="password"
                id="passwordInput"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
              />
              {fieldErrors.password && <div className="error">{fieldErrors.password}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPasswordInput">Повторите пароль</label>
              <input
                type="password"
                id="confirmPasswordInput"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={handleConfirmPasswordBlur}
              />
              {fieldErrors.confirmPassword && <div className="error">{fieldErrors.confirmPassword}</div>}
            </div>
            {error && <div className="error">{error}</div>}
            <div className="form-actions">
              <button type="submit" className="button">Зарегистрироваться</button>
            </div>
          </form>
          <div className="auth-links">
            <p>Уже есть аккаунт? <Link href="/login">Войти</Link></p>
            <p><Link href="/">Вернуться на главную</Link></p>
          </div>
        </>
      )}
    </section>
  );
}