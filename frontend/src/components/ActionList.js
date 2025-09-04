// Универсальный компонент для списков с действиями
export default function ActionList({ 
  title, 
  items, 
  renderItem, 
  emptyMessage = "Элементов нет",
  addButtonText,
  addButtonHref,
  onItemAction
}) {
  return (
    <div className="chapters-block">
      <h3>{title}</h3>
      <ul className="chapters-list">
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={item.id || index}>
              {renderItem(item, onItemAction)}
            </li>
          ))
        ) : (
          <li>{emptyMessage}</li>
        )}
      </ul>
      
      {addButtonText && addButtonHref && (
        <div style={{ marginTop: 16 }}>
          <a href={addButtonHref} className="button add-book-btn">
            {addButtonText}
          </a>
        </div>
      )}
    </div>
  );
}
