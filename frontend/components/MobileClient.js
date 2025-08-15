import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import eventEmitter from "./EventEmitter";

const MobileClient = React.memo(function MobileClient({ client, isNew, onSave, onCancel }) {
  // memo чтобы не было лишних рендеров
  const [editing, setEditing] = useState(false);

  const famRef = useRef();
  const imRef = useRef();
  const otchRef = useRef();
  const balanceRef = useRef();

  const startEdit = () => setEditing(true);

  const saveEdit = () => {
    const updatedClient = {
      ...client,
      fam: famRef.current.value,
      im: imRef.current.value,
      otch: otchRef.current.value,
      balance: Number(balanceRef.current.value),
    };
    eventEmitter.emit("editClient", updatedClient);
    setEditing(false);
  };

  const cancelEdit = () => setEditing(false);

  console.log("MobileClient render", client.id, client.fam);

  // Режим добавления нового клиента
  if (isNew) {
    return (
      <tr>
        <td>
          <input className="edit-input" ref={famRef} placeholder="Фамилия" />
        </td>
        <td>
          <input className="edit-input" ref={imRef} placeholder="Имя" />
        </td>
        <td>
          <input className="edit-input" ref={otchRef} placeholder="Отчество" />
        </td>
        <td>
          <input
            className="edit-input"
            type="number"
            ref={balanceRef}
            placeholder="Баланс"
          />
        </td>
        <td></td>
        <td className="button-group">
          <button
            className="edit-btn"
            onClick={() => {
              const newClient = {
                id: client.id,
                fam: famRef.current.value,
                im: imRef.current.value,
                otch: otchRef.current.value,
                balance: Number(balanceRef.current.value),
              };
              onSave(newClient);
            }}
          >
            ✅
          </button>
          <button className="delete-btn" onClick={onCancel}>
            ❌
          </button>
        </td>
        <td></td>
      </tr>
    );
  }

  // обычный режим отображения клиента
  return (
    <tr>
      <td>
        {editing ? (
          <input
            className="edit-input"
            defaultValue={client.fam}
            ref={famRef}
          />
        ) : (
          client.fam
        )}
      </td>
      <td>
        {editing ? (
          <input className="edit-input" defaultValue={client.im} ref={imRef} />
        ) : (
          client.im
        )}
      </td>
      <td>
        {editing ? (
          <input
            className="edit-input"
            defaultValue={client.otch}
            ref={otchRef}
          />
        ) : (
          client.otch
        )}
      </td>
      <td>
        {editing ? (
          <input
            className="edit-input"
            defaultValue={client.balance}
            ref={balanceRef}
          />
        ) : (
          client.balance
        )}
      </td>
      <td>
        <span
          className={client.balance >= 0 ? "status-active" : "status-blocked"}
        >
          {client.balance >= 0 ? "active" : "blocked"}
        </span>
      </td>
      <td className="button-group">
        {editing ? (
          // обертка кнопок в React.Fragment
          <>
            <button className="edit-btn" onClick={saveEdit}>
              ✅
            </button>
            <button className="delete-btn" onClick={cancelEdit}>
              ❌
            </button>
          </>
        ) : (
          <button className="edit-btn" onClick={startEdit}>
            Редактировать
          </button>
        )}
      </td>
      <td>
        <button
          className="delete-btn"
          onClick={() => {
            if (window.confirm("Удалить клиента?")) {
              eventEmitter.emit("deleteClient", client.id);
            }
          }}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
});

MobileClient.propTypes = {
  client: PropTypes.object.isRequired,
  isNew: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default MobileClient;
