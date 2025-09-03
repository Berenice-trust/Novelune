document.addEventListener("DOMContentLoaded", () => {
  // --- Удаление аккаунта ---
  const deleteBtn = document.getElementById("deleteAccountBtn");
  const modal = document.getElementById("modalOverlay");
  const modalCancel = document.getElementById("modalCancel");
  const modalConfirm = document.getElementById("modalConfirm");

  // Если кнопка удаления есть, навешиваем обработчики
  if (deleteBtn) {
    // Открыть модалку подтверждения удаления
    deleteBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    // Закрыть модалку по кнопке "Отмена"
    modalCancel?.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Подтвердить удаление аккаунта
    modalConfirm?.addEventListener("click", async () => {
      modal.style.display = "none";
      const res = await fetch("/api/user/delete", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/";
      } else {
        // Можно доработать: показать ошибку пользователю
        console.error(data.message || "Ошибка удаления");
      }
    });

    // Закрытие по клику вне модального окна
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  // --- Редактирование профиля ---












  // обработчик кнопки добавления Книги и главы
  const createBookBtn = document.getElementById("createBookBtn");
  if (createBookBtn) {
    createBookBtn.addEventListener("click", () => {
      window.location.href = "/books/new";
    });
  }

  const addChapterBtn = document.getElementById("addChapterBtn");
  if (addChapterBtn) {
    addChapterBtn.addEventListener("click", () => {
      // Здесь должен быть bookId, если он есть на странице
      const bookId = window.currentBookId; // или получи другим способом
      if (bookId) {
        window.location.href = `/books/${bookId}/chapters/new`;
      } else {
        alert("Сначала сохраните книгу!");
      }
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include", // для правильной работы с куками!
        });

        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }

        // Удаляем данные из localStorage
        localStorage.removeItem("username");
        localStorage.removeItem("userRole");

        // Перенаправляем на главную
        // Добавь небольшую задержку перед редиректом
        // чтобы браузер успел обработать удаление куки
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      } catch (error) {
        console.error("Ошибка при выходе:", error);
        alert(
          "Не удалось выйти из системы. Попробуйте ещё раз или обновите страницу."
        );
      }
    });
  }
});
