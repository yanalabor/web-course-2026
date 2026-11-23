
import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";

import TodoForm from "./components/TodoForm";
import Filters from "./components/Filters";
import Stats from "./components/Stats";
import TodoList from "./components/TodoList";

import { getVisibleTodos } from "./utils/todoUtils";

import "./App.css";

function App() {
  // Восстановление задач из localStorage
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");

      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");

  // Сохранение задач при каждом изменении списка
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Добавление задачи
  const addTodo = useCallback((text, completed) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed,
      createdAt: new Date().toISOString()
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  // Изменение статуса задачи
  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  // Удаление задачи
  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  }, []);

  // Фильтрация и сортировка
  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, filter, sort);
  }, [todos, filter, sort]);

  // Статистика
  const stats = useMemo(() => {
    const completed = todos.filter(
      (todo) => todo.completed
    ).length;

    return {
      total: todos.length,
      completed,
      active: todos.length - completed
    };
  }, [todos]);

  return (
    <main className="app">
      <h1>Мой Todo-list</h1>

      <p className="subtitle">
        Планируй свои задачи и выполняй их!
      </p>

      <TodoForm onAdd={addTodo} />
      <Stats stats={stats} />

      <Filters
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

    </main>
  );
}

export default App;
