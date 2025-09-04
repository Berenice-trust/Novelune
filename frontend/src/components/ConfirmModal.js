// Универсальное модальное окно подтверждения
export default function ConfirmModal({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Подтвердите действие",
  message = "Вы уверены?",
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  confirmVariant = "danger"
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button 
            type="button" 
            className="button secondary" 
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            type="button" 
            className={`button ${confirmVariant}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
