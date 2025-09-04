"use client";

import DashboardProfile from "../../components/DashboardProfile";
import BookList from "../../components/BookList";
import { useUser } from '../../hooks/useUser';

export default function DashboardPage() {
  const { user, loading } = useUser();

  const handleBookAction = (action, book) => {
    if (action === 'open') {
      window.location.href = `/books/${book.id}`;
    } else if (action === 'delete') {
      if (confirm(`Удалить книгу "${book.title}"?`)) {
        console.log('Удаляем книгу:', book.id);
      }
    }
  };

  // заглушка
  const books = [
    { id: 1, title: "Заглушка 1", status: "finished" },
    { id: 2, title: "Заглушка 2", status: "completed" },
    { id: 3, title: "Заглушка 3", status: "in_progress" }
  ];

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Нужна авторизация</div>;

  return (
    <main>
      <DashboardProfile user={user} />
      <h2>Мои книги</h2>
      <BookList books={books} showAuthor={false} onAction={handleBookAction} />
    </main>
  );
}