"use client";
import Link from "next/link";
import AvatarUpload from "./AvatarUpload";
import EditProfileModal from "./EditProfileModal";
import InfoSection from "./InfoSection";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

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
    setIsDeleteOpen(false);
  };

  const profileData = [
    { label: "Логин", value: user.username },
    { label: "Псевдоним", value: user.nickname || "Не указан" },
    { label: "Email", value: user.email },
    { label: "О себе", value: user.bio || "Не указано" }
  ];

  return (
    <>
      <InfoSection
        title="Личный кабинет"
        data={profileData}
        onEdit={() => setIsModalOpen(true)}
        canEdit={true}
      >
        <button className="delete-account-btn" onClick={() => setIsDeleteOpen(true)}>
          Удалить аккаунт
        </button>
        
        <div className="dashboard-avatar-block">
          <div className="avatar-rect" style={{ position: "relative" }}>
            <AvatarUpload currentAvatarUrl={user.avatarUrl || "/default-avatar.png"} />
          </div>
        </div>
      </InfoSection>

      <div className="dashboard-actions" style={{ textAlign: "center", marginTop: 20 }}>
        <Link href="/books/new">
          <button className="button add-book-btn">Создать книгу</button>
        </Link>
      </div>

      {/* Модалка для редактирования профиля */}
      <EditProfileModal
        user={user}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Удалить аккаунт?"
        message="Вы уверены, что хотите удалить аккаунт? Это действие необратимо!"
        confirmText="Удалить"
        cancelText="Отмена"
        confirmVariant="danger"
      />
    </>
  );
}