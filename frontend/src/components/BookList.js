import BookItem from "./BookItem";

export default function BookList({ books }) {
  return (
    <ul className="books-list">
      {books.length === 0 ? (
        <li>У вас пока нет книг</li>
      ) : (
        books.map(book => <BookItem key={book.id} book={book} />)
      )}
    </ul>
  );
}