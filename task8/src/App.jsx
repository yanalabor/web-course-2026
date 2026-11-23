
import { useState } from "react";

import TodoForm from "./components/TodoForm";
import Filters from "./components/Filters";
import Stats from "./components/Stats";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const [filter, setFilter] = useState("all");

  function addTodo(text, completed) {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed,
      createdAt: new Date().toISOString()
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  return (
    <main className="app">
      <h1>Мой Todo-list</h1>

      <p className="subtitle">
        Планируй свои задачи и выполняй их!
      </p>

      <TodoForm onAdd={addTodo} />

      <Stats todos={todos} />

      <Filters
        filter={filter}
        setFilter={setFilter}
      />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </main>
  );
}

export default App;
