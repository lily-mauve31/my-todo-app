import { useState, useRef } from 'react';
import './index.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([
    {id: 1, name: "Todo1", completed: false},
  ]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // タスクを追加する
    const name = todoNameRef.current.value;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };
  
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <div className="App font-mono mx-auto my-0 w-3/4">
      {/* Tailwind CSSのクラスを使用 */}
      <h1 className="text-4xl font-bold py-4">
        Dashboard
      </h1>
      <h2 className="text-lg font-bold py-3">Today's Tasks</h2>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      <div>
        <button onClick={handleAddTodo} type="button" className="mt-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Create a new task</button>
        <button onClick={handleClear} type="button" className="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete a completed task</button>
      </div>
      <p className="mt-4">Remained tasks: {todos.filter((todo) => !todo.completed).length}</p>  
    </div>
  );
}

export default App;
