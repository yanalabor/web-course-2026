
import React from "react";

function TodoItem({ todo, onToggle, onDelete }) {
    console.log("Рендер задачи:", todo.text);

    return (
        <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <label className="todo-label">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />

                <span>{todo.text}</span>
            </label>

            <button
                className="delete-button"
                onClick={() => onDelete(todo.id)}
            >
                Удалить
            </button>
        </div>
    );
}

export default React.memo(TodoItem);
