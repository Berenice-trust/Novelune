"use client";

import DashboardProfile from "../../components/DashboardProfile";
import BookList from "../../components/BookList";
import { useUser } from '../../hooks/useUser';

// Пока можно использовать заглушки
export default function DashboardPage() {
  //Позже сюда добавим пользователя и книг
  // const user = {
  //   username: "Заглушка bernice",
  //   nickname: "Вероника",
  //   email: "bernice.trust@gmail.com",
  //   about: "best of the best",
  //   avatarUrl: "/default-avatar.png"
  // };
   const { user, loading } = useUser();

  

  // заглушка
  const books = [
    { id: 1, title: "Заглушка 1", status: "finished" },
    { id: 2, title: "Заглушка 2", status: "finished" },
    { id: 3, title: "Заглушка 3", status: "inprogress" }
  ];

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Нужна авторизация</div>;

  return (
    <main>
      <DashboardProfile user={user} />
      <h2>Мои книги</h2>
      <BookList books={books} />
    </main>
  );
}