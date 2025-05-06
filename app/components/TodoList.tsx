'use client';

import { useState } from 'react';
import { gql, useQuery, useMutation } from 'urql';

// クライアント側でTodoの型を使用するために必要なクエリを作成
const TODOS_QUERY = gql`
  query Todos {
    todos {
      id
      text
      completed
    }
  }
`;

const ADD_TODO_MUTATION = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const TOGGLE_TODO_MUTATION = gql`
  mutation ToggleTodo($id: String!) {
    toggleTodo(id: $id) {
      id
      text
      completed
    }
  }
`;

// 型の定義
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodosData {
  todos: Todo[];
}

interface AddTodoData {
  addTodo: Todo;
}

interface ToggleTodoData {
  toggleTodo: Todo | null;
}

export default function TodoList() {
  const [newTodoText, setNewTodoText] = useState('');
  
  // 型安全なクエリとミューテーションを使用
  const [todosResult] = useQuery<TodosData>({ query: TODOS_QUERY });
  const [, addTodo] = useMutation<AddTodoData, { text: string }>(ADD_TODO_MUTATION);
  const [, toggleTodo] = useMutation<ToggleTodoData, { id: string }>(TOGGLE_TODO_MUTATION);

  const handleAddTodo = async (e: React.FormEvent) => {
    debugger
    e.preventDefault();
    if (!newTodoText.trim()) return;
    
    await addTodo({ text: newTodoText });
    setNewTodoText('');
  };

  const handleToggleTodo = async (id: string) => {
    await toggleTodo({ id });
  };

  if (todosResult.fetching) return <div>Loading...</div>;
  if (todosResult.error) return <div>Error: {todosResult.error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todoリスト</h1>
      
      <form onSubmit={handleAddTodo} className="mb-4 flex">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="新しいTodoを入力"
          className="border p-2 flex-grow rounded-l"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          追加
        </button>
      </form>

      <ul className="space-y-2">
        {todosResult.data?.todos.map((todo) => (
          <li 
            key={todo.id} 
            className="flex items-center p-2 border rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className="mr-2 h-5 w-5"
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
} 