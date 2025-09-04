import Link from "next/link";

// Универсальный элемент списка с действиями (для книг и глав)
export default function ListItem({ 
  title, 
  subtitle, 
  metadata, 
  actions = [],
  href 
}) {
  const content = (
    <>
      <div className="book-info">
        <span className="book-title">{title}</span>
        {subtitle && <span className="book-status">{subtitle}</span>}
        {metadata && <span className="book-genre">{metadata}</span>}
      </div>
      <div className="book-actions">
        {actions.map((action, index) => (
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
