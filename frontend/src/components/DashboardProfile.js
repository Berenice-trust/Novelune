"use client";
import Link from "next/link";
// import Image from 'next/image';
import AvatarUpload from "./AvatarUpload";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";

export default function DashboardProfile({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteAccount = async () => {
  const res = await fetch("/api/user/delete", { method: "POST", credentials: "include" });
  const data = await res.json();
  if (data.success) {
    window.location.href = "/";
  } else {
    alert(data.message || "Ошибка удаления");
  }
};





  // Можно добавить обработчик onError только если компонент точно клиентский
  return (
    <section className="welcome">
      <button className="delete-account-btn" onClick={() => setIsDeleteOpen(true)}>
        Удалить аккаунт
      </button>
      <div className="welcome-flex">
        <div className="dashboard-avatar-block">
          <div className="avatar-rect" style={{ position: "relative" }}>
            <AvatarUpload currentAvatarUrl={user.avatarUrl || "/default-avatar.png"} />
          </div>
        </div>
        <div className="welcome-info">
          <h2 className="welcome-title">
            Личный кабинет
            <button
              className="edit-icon"
              title="Редактировать"
              onClick={() => setIsModalOpen(true)}
              type="button"
            >
          
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M14.7 2.29a1 1 0 0 1 1.42 0l1.59 1.59a1 1 0 0 1 0 1.42l-9.17 9.17-2.83.71.71-2.83 9.17-9.17z" fill="#2c3e50"/>
                <path d="M3 17h14v2H3v-2z" fill="#007bff" opacity="0.2"/>
              </svg>
         
            </button>
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
              <span className="profile-value">{user.bio}</span>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link href="/books/new">
              <button className="button add-book-btn">Создать книгу</button>
            </Link>
          </div>
        </div>
      </div>

       {/* Модалка для редактирования профиля */}
      <EditProfileModal
        user={user}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    <DeleteAccountModal
      open={isDeleteOpen}
      onClose={() => setIsDeleteOpen(false)}
      onConfirm={handleDeleteAccount}
    />
    </section>
  );
}