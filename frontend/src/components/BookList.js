import BookItem from "./BookItem";

export default function BookList({ books, showAuthor = false, onAction }) {
  return (
    <ul className="books-list">
      {books.length === 0 ? (
        <li>У вас пока нет книг</li>
      ) : (
        books.map(book => (
          <BookItem 
            key={book.id} 
            book={book} 
            showAuthor={showAuthor}
            actions={[
              { 
                label: "Открыть", 
                variant: "edit-chapter-btn", 
                onClick: () => onAction?.('open', book) 
              },
              { 
                label: "Удалить", 
                variant: "danger", 
                onClick: () => onAction?.('delete', book) 
              }
            ]}
          />
        ))
      )}
    </ul>
  );
}