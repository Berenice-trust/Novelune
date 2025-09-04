// Универсальный компонент для отображения информации с возможностью редактирования
export default function InfoSection({ title, data, onEdit, canEdit = false, children }) {
  return (
    <section className="welcome">
      <h2 className="welcome-title">
        {title}
        {canEdit && (
          <button className="edit-icon" title="Редактировать" onClick={onEdit}>
            <svg viewBox="0 0 20 20" fill="none" width="28" height="28">
              <path d="M14.7 2.29a1 1 0 0 1 1.42 0l1.59 1.59a1 1 0 0 1 0 1.42l-9.17 9.17-2.83.71.71-2.83 9.17-9.17z" fill="#2c3e50"/>
            </svg>
          </button>
        )}
      </h2>
      
      <div className="welcome-flex">
        {children}
        
        <div className="welcome-info">
          <div className="profile-fields">
            {data.map((item, index) => (
              <div key={index} className="profile-row">
                <span className="profile-label">{item.label}:</span>
                <span className="profile-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
