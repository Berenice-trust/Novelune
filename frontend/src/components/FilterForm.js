// Универсальный компонент фильтра для списков
export default function FilterForm({ 
  filters, 
  onFilterChange, 
  onReset,
  children 
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const filterData = Object.fromEntries(formData.entries());
    onFilterChange?.(filterData);
  };

  return (
    <form onSubmit={handleSubmit} className="books-filter-form">
      {children}
      <button type="submit" className="button add-book-btn">
        Фильтровать
      </button>
      {onReset && (
        <button 
          type="button" 
          className="button add-book-btn third"
          onClick={onReset}
        >
          Сбросить
        </button>
      )}
    </form>
  );
}
