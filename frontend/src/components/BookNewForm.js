import React from "react";
import Image from "next/image";

export default function BookNewForm() {
  return (
    <div>
      <h2 className="welcome-title">Создать книгу</h2>
      <div className="welcome-flex">
        <form
          id="createBookForm"
          className="createBookForm"
          encType="multipart/form-data"
        >
          <div>
            <div className="book-cover-rect">
              <Image
                id="coverPreview"
                src="/default-cover.png"
                alt="Обложка"
                className="book-cover-img"
                width={200}
                height={300}
              />
              {/* <span className="book-cover-text">Кликните, чтобы выбрать файл ниже</span> */}
            </div>
            <input
              type="file"
              id="coverInput"
              name="cover_image"
              accept="image/*"
              className="book-cover-input"
            />
          </div>
          <div className="welcome-info">
            <div className="form-group">
              <label htmlFor="title">Название</label>
              <input type="text" id="title" name="title" required />
            </div>
            <div
              className="form-group genre-row"
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <label htmlFor="genre_id">Жанр</label>
              <select id="genre_id" name="genre_id" required>
                <option value="">Выберите жанр</option>
                {/* Здесь будет динамический список жанров */}
              </select>
              <label htmlFor="subgenre_id" style={{ marginLeft: "10px" }}>Поджанр</label>
              <select id="subgenre_id" name="subgenre_id">
                <option value="">Выберите поджанр</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Аннотация</label>
              <textarea id="description" name="description" rows={4}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="status">Статус</label>
              <select id="status" name="status">
                <option value="draft">Черновик</option>
                <option value="in_progress">В процессе</option>
                <option value="completed">Завершена</option>
              </select>
            </div>
            {/*
            <div className="chapter-section">
              <button type="button" id="addChapterBtn" className="button add-book-btn">Добавить главу</button>
              <ul id="chaptersList" className="chapters-list"></ul>
            </div>
            */}
            <div className="form-actions">
              <button type="submit" className="button" id="saveBookBtn">Сохранить книгу</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
