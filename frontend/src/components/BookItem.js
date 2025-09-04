import Link from "next/link";

export default function BookItem({ 
  book, 
  showAuthor = false, 
  actions = [],
  href = null 
}) {
  const defaultActions = [
    { label: "Открыть", variant: "edit-chapter-btn", onClick: () => {} },
    { label: "Удалить", variant: "danger", onClick: () => {} }
  ];

  const finalActions = actions.length > 0 ? actions : defaultActions;

  const content = (
    <>
      <div className="book-info">
        <span className="book-title">{book.title}</span>
        {showAuthor && (
          <span className="book-author">
            Автор: {book.author_display_name || book.author_name}
          </span>
        )}
        {book.genre_name && (
          <span className="book-genre">
            Жанр: {book.genre_name}
            {book.subgenre_name && ` / ${book.subgenre_name}`}
          </span>
        )}
        <span className="book-status">
          {book.status === "draft" && "Черновик"}
          {book.status === "in_progress" && "В процессе"}
          {book.status === "completed" && "Завершена"}
          {book.status === "finished" && "Завершена"}
        </span>
      </div>
      <div className="book-actions">
        {finalActions.map((action, index) => (
          <button 
            key={index}
            className={`button ${action.variant || 'edit-chapter-btn'}`}
            onClick={action.onClick}
            type="button"
          >
            {action.label}
          </button>
        ))}
      </div>
    </>
  );

  if (href) {
    return (
      <li className="book-item">
        <Link href={href} style={{ display: 'contents' }}>
          {content}
        </Link>
      </li>
    );
  }

  return <li className="book-item">{content}</li>;
}