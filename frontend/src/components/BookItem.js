export default function BookItem({ book }) {
  return (
    <li className="book-item">
      <div className="book-info">
        <span className="book-title">{book.title}</span>
        <span className="book-status">
          {book.status === "draft" && "Черновик"}
          {book.status === "in_progress" && "В процессе"}
          {book.status === "finished" && "Завершена"}
        </span>
      </div>
      <div className="book-actions">
        <button className="button edit-chapter-btn">Открыть</button>
        <button className="button danger delete-book-btn">Удалить</button>
      </div>
    </li>
  );
}