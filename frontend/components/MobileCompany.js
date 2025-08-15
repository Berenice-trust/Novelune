import React, { useState, useEffect, useCallback } from "react";
import "./styles.scss";
import FilterButtons from "./FilterButtons";
import MobileClient from "./MobileClient";
import eventEmitter from "./EventEmitter"; // импортируем EventEmitter

function MobileCompany() {
  const [clients, setClients] = useState([
    { id: 1, fam: "Иванов", im: "Иван", otch: "Иванович", balance: 200 },
    { id: 2, fam: "Сидоров", im: "Сидор", otch: "Сидорович", balance: 250 },
    { id: 3, fam: "Петров", im: "Пётр", otch: "Петрович", balance: 180 },
    {
      id: 4,
      fam: "Григорьев",
      im: "Григорий",
      otch: "Григорьевич",
      balance: -220,
    },
  ]);
  const [filter, setFilter] = useState("all"); // all | active | blocked
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    eventEmitter.on("deleteClient", deleteClient);
    eventEmitter.on("editClient", editClient);

    // Функция очистки (типа componentWillUnmount)
    return () => {
      eventEmitter.off("deleteClient", deleteClient);
      eventEmitter.off("editClient", editClient);
    };
  }, [deleteClient, editClient]);

  // useCallback чтобы не менялась ссылка
  const deleteClient = useCallback(
    (id) => {
      const client = clients.find((client) => client.id === id);
      console.log(
        "Удаление клиента с id:",
        id,
        client ? client.fam : "Неизвестный",
      );
      setClients((prev) => prev.filter((client) => client.id !== id));
    },
    [clients],
  );

  // обработчик события редактирования
  const editClient = useCallback((updatedClient) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === updatedClient.id ? updatedClient : client,
      ),
    );
  }, []);

  const startAddClient = () => {
    setAdding(true);
  };

  const cancelAddClient = () => {
    setAdding(false);
  };

  const addClient = (newClient) => {
    console.log("Добавлен клиент: id =", newClient.id, newClient.fam);
    setClients((prev) => [...prev, newClient]);
    setAdding(false);
  };

  console.log("MobileCompany render");

  // фильтрация клиентов
  let filteredClients = clients;
  if (filter === "active") {
    filteredClients = filteredClients.filter((c) => c.balance >= 0);
  }
  if (filter === "blocked") {
    filteredClients = filteredClients.filter((c) => c.balance < 0);
  }

  return (
    <div>
      <h2>Мобильная компания</h2>

      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

      <table className="MobileCompany-table">
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Редактировать</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <MobileClient key={client.id} client={client} />
          ))}
          {adding && (
            <MobileClient
              client={{
                id: Math.max(0, ...clients.map((c) => c.id)) + 1,
                fam: "",
                im: "",
                otch: "",
                balance: 0,
              }}
              isNew={true}
              onSave={addClient}
              onCancel={cancelAddClient}
            />
          )}
        </tbody>
      </table>
      <button className="edit-btn" onClick={startAddClient}>
        Добавить клиента
      </button>
    </div>
  );
}

export default MobileCompany;
