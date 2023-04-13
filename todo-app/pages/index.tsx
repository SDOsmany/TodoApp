// frontend/pages/index.tsx

import { useState } from "react";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }
    const response = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputValue.trim(),
        completed: false,
      }),
    });
    const todo = await response.json();
    setTodos([...todos, todo]);
    setInputValue("");
  };
  const handleToggle = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return;
    }
    const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });
    const updatedTodo = await response.json();
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
      )
    );
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    });
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  <input
  type="text"
  placeholder="Add a todo"
  value={inputValue}
  onChange={handleInputChange}
  className="rounded-md border-gray-400 border-2 py-2 px-3 w-full"
/>

  return (
    <>
      <Header />
      <main className="container mx-auto py-4">
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Add a todo"
            value={inputValue}
            onChange={handleInputChange}
            className="rounded-md border-gray-400 border-2 py-2 px-3 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 ml-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
