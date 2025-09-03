import { useState, useEffect } from "react";

export default function EditProfileModal({ user, open, onClose }) {
  // Состояния для полей формы
  const [form, setForm] = useState({
    display_name: "",
    email: "",
    bio: "",
    new_password: "",
    repeat_password: "",
  });
  const [errors, setErrors] = useState({});

  // При открытии модалки сбрасываем поля на актуальные значения пользователя
  useEffect(() => {
    if (open && user) {
      setForm({
        display_name: user.display_name || "",
        email: user.email || "",
        bio: user.bio || "",
        new_password: "",
        repeat_password: "",
      });
      setErrors({});
    }
  }, [open, user]);

  // Обработчик изменения любого поля
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok && result.success) {
        onClose();
        window.location.reload();
      } else if (result.errors) {
        setErrors(result.errors);
      } else {
        alert("Ошибка сохранения профиля");
      }
    } catch {
      alert("Ошибка соединения с сервером");
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" style={{ display: "flex" }}>
      <div className="modal">
        <button
          type="button"
          className="modal-close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          &times;
        </button>

        <h3>Редактировать профиль</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="displayNameInput">Псевдоним:</label>
            <input
              type="text"
              id="displayNameInput"
              name="display_name"
              value={form.display_name}
              onChange={handleChange}
            />
            <span className="error-text">{errors.display_name}</span>
          </div>
          <div className="form-group">
            <label htmlFor="emailInput">Email:</label>
            <input
              type="email"
              id="emailInput"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <span className="profile-note">
              <em>Изменение потребует подтверждения</em>
            </span>
            <span className="error-text">{errors.email}</span>
          </div>
          <div className="form-group">
            <label htmlFor="bioInput">О себе:</label>
            <textarea
              id="bioInput"
              name="bio"
              rows={4}
              value={form.bio}
              onChange={handleChange}
            />
            <span className="error-text">{errors.bio}</span>
          </div>
          <hr style={{ margin: "18px 0" }} />
          <div className="form-group">
            <label htmlFor="newPasswordInput">Новый пароль:</label>
            <input
              type="password"
              id="newPasswordInput"
              name="new_password"
              autoComplete="new-password"
              value={form.new_password}
              onChange={handleChange}
            />
            <span className="error-text">{errors.new_password}</span>
          </div>
          <div className="form-group">
            <label htmlFor="repeatPasswordInput">Повторите новый пароль:</label>
            <input
              type="password"
              id="repeatPasswordInput"
              name="repeat_password"
              autoComplete="new-password"
              value={form.repeat_password}
              onChange={handleChange}
            />
            <span className="error-text">{errors.repeat_password}</span>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="button secondary"
              onClick={onClose}
            >
              Отмена
            </button>
            <button type="submit" className="button">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}