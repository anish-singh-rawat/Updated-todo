import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faTrash,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../staticData/buttonData";

const TodosList = ({
  todos,
  setTodos,
  editTodo,
  setEditTodo,
  isEdit,
  setIsEdit,
  errorMessage,
  setErrorMessage,
}) => {
  const [editedText, setEditedText] = useState("");
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(data[0].id);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleFilter = (id, name) => {
    setFilter(name);
    setActive(id);
  };

  useEffect(() => {
    const filterTodos = () => {
      if (filter === "All") {
        return todos;
      } else if (filter === "Completed") {
        return todos.filter((todo) => todo.completed);
      } else if (filter === "Incomplete") {
        return todos.filter((todo) => !todo.completed);
      }
    };
    setFilteredTodos(filterTodos());
  }, [filter, todos]);

  const handleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const onChangeInput = (e) => {
    setEditedText(e.target.value);
    setErrorMessage("");
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    setEditTodo(id);
    const editedTodo = todos.find((todo) => todo.id === id);
    setEditedText(editedTodo.title);
  };

  const handleSave = () => {
    const trimmedText = editedText.trim();
    if (trimmedText !== "") {
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo ? { ...todo, title: trimmedText } : todo
      );
      setTodos(updatedTodos);
    } else {
      setErrorMessage("Todo cannot be empty");
    }
    setEditTodo(null);
    setIsEdit(false);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <div className="status">
        {data.map((ele) => {
          return (
            <button
              className={ele.id === active ? "active" : "status-btn"}
              onClick={() => handleFilter(ele.id, ele.name)}
              key={ele.id}
            >
              {ele.name}
            </button>
          );
        })}
      </div>
      {filteredTodos.map((todo) => (
        <div className="display-todos" key={todo.id}>
          <li className="list">
            <div className="single-todo">
              <div className="checkbox-text">
                <input
                  className="check-box"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleComplete(todo.id)}
                />
                {isEdit && editTodo === todo.id ? (
                  <input
                    type="text"
                    className="todos-input-field"
                    value={editedText}
                    onChange={onChangeInput}
                  />
                ) : (
                  todo.title
                )}
              </div>
              {todo.completed === true ? (
                <div className="done-msg">Completed</div>
              ) : (
                ""
              )}
            </div>
            {isEdit && editTodo === todo.id ? (
              <button className="btn" onClick={handleSave}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            ) : (
              <>
                <button className="btn" onClick={() => handleEdit(todo.id)}>
                  <FontAwesomeIcon icon={faPenSquare} />
                </button>
                <button className="btn" onClick={() => handleDelete(todo.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </li>
        </div>
      ))}
    </div>
  );
};

export default TodosList;
