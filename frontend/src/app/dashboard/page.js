import DashboardProfile from "../../components/DashboardProfile";
import BookList from "../../components/BookList";

// Пока можно использовать заглушки
export default function DashboardPage() {
  // Позже сюда добавим SSR fetch пользователя и книг
  const user = {
    username: "bernice",
    nickname: "Вероника",
    email: "bernice.trust@gmail.com",
    about: "best of the best",
    avatarUrl: "/default-avatar.png"
  };
  const books = [
    { id: 1, title: "wiki book", status: "finished" },
    { id: 2, title: "book 2", status: "finished" },
    { id: 3, title: "book 1", status: "inprogress" }
  ];

  return (
    <main>
      <DashboardProfile user={user} />
      <h2>Мои книги</h2>
      <BookList books={books} />
    </main>
  );
}