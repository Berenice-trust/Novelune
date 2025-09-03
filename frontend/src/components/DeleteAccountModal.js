import React from "react";

export default function DeleteAccountModal({ open, onClose, onConfirm }) {
  // Закрытие по клику вне модального окна
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      id="modalOverlay"
      className="modal-overlay"
      style={{ display: "flex" }}
      onClick={handleOverlayClick}
    >
      <div className="modal">
        <h3>Удалить аккаунт?</h3>
        <p>Вы уверены, что хотите удалить аккаунт? Это действие необратимо!</p>
        <div className="modal-actions">
          <button
            id="modalCancel"
            className="button secondary"
            type="button"
            onClick={onClose}
          >
            Отмена
          </button>
          <button
            id="modalConfirm"
            className="button danger"
            type="button"
            onClick={onConfirm}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}