
import { useState } from "react";

function TodoForm({ onAdd }) {
    const [text, setText] = useState("");
    const [completed, setCompleted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (!text.trim()) return;

        onAdd(text.trim(), completed);

        setText("");
        setCompleted(false);
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Введите новую задачу..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <select
                value={completed ? "completed" : "active"}
                onChange={(e) =>
                    setCompleted(e.target.value === "completed")
                }
            >
                <option value="active">Не выполнена</option>
                <option value="completed">Выполнена</option>
            </select>

            <button type="submit">Добавить</button>
        </form>
    );
}

export default TodoForm;
