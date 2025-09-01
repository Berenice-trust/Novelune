"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ActivateClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("Проверка...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/activate?token=${token}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStatus("Аккаунт успешно активирован! Теперь вы можете войти.");
            setSuccess(true);
          } else {
            setStatus(data.message || "Ошибка активации.");
            setSuccess(false);
          }
        })
        .catch(() => {
          setStatus("Ошибка сети.");
          setSuccess(false);
        });
    } else {
      setStatus("Некорректная ссылка активации.");
      setSuccess(false);
    }
  }, [token]);

  return (
    <section className="auth-section">
      <h2>Активация аккаунта</h2>
      <div className={success ? "success" : "error"}>{status}</div>
      <div className="auth-links" style={{ marginTop: 24 }}>
        {success ? (
          <Link href="/login" className="button">Войти</Link>
        ) : (
          <Link href="/" className="button">На главную</Link>
        )}
      </div>
    </section>
  );
}