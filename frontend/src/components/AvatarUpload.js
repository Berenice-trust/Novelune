import React, { useRef, useState } from "react";

export default function AvatarUpload({ currentAvatarUrl, onUpload }) {
  const [preview, setPreview] = useState(currentAvatarUrl || "/default-avatar.png");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Файл слишком большой! Максимум 10 МБ.");
      return;
    }
    // Показываем превью
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    // Отправляем файл
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    try {
      const res = await fetch("/api/avatar/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      setLoading(false);
      if (res.redirected) {
        window.location.href = res.url;
      } else if (res.ok) {
        if (onUpload) onUpload();
        else window.location.reload();
      } else {
        alert("Ошибка загрузки аватара");
      }
    } catch {
      setLoading(false);
      alert("Ошибка загрузки аватара");
    }
  };

  return (
    <div className="avatar-upload-block">
      <div className="avatar-rect" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
        <img
          src={preview}
          alt="Аватар"
          className="avatar-img"
        />
        <span className="avatar-text">Кликните, чтобы загрузить аватар</span>
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
