"use client";
import Link from "next/link";

export default function DashboardProfile({ user }) {
  // Можно добавить обработчик onError только если компонент точно клиентский
  return (
    <section className="welcome">
      <button className="delete-account-btn">Удалить аккаунт</button>
      <div className="welcome-flex">
        <div className="dashboard-avatar-block">
          <div className="avatar-rect" style={{ position: "relative" }}>
            <img
              src={user.avatarUrl}
              alt="Аватар"
              className="avatar-img"
              onError={e => { e.target.src = "/default-avatar.png"; }}
            />
            <span className="avatar-text">Кликните, чтобы загрузить аватар</span>
          </div>
        </div>
        <div className="welcome-info">
          <h2 className="welcome-title">
            Личный кабинет
            <span className="edit-icon" title="Редактировать">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M14.7 2.29a1 1 0 0 1 1.42 0l1.59 1.59a1 1 0 0 1 0 1.42l-9.17 9.17-2.83.71.71-2.83 9.17-9.17z" fill="#2c3e50"/>
                <path d="M3 17h14v2H3v-2z" fill="#007bff" opacity="0.2"/>
              </svg>
            </span>
          </h2>
          <div className="profile-fields">
            <div className="profile-row">
              <span className="profile-label">Логин:</span>
              <span className="profile-value">{user.username}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Псевдоним:</span>
              <span className="profile-value">{user.nickname || <span className="profile-note">Не указан</span>}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{user.email}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">О себе:</span>
              <span className="profile-value">{user.about}</span>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link href="/books/new">
              <button className="button add-book-btn">Создать книгу</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}