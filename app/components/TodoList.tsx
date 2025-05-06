"use client";

import { useState } from "react";
import {
	useAddTodoMutation,
	useTodosQuery,
	useToggleTodoMutation,
} from "../__generated__/gql";

export default function TodoList() {
	const [newTodoText, setNewTodoText] = useState("");

	// 生成されたフックを使用
	const [todosResult] = useTodosQuery();
	const [, addTodo] = useAddTodoMutation();
	const [, toggleTodo] = useToggleTodoMutation();

	const handleAddTodo = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTodoText.trim()) return;

		await addTodo({ text: newTodoText });
		setNewTodoText("");
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
				<button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
					追加
				</button>
			</form>

			<ul className="space-y-2">
				{todosResult.data?.todos?.map((todo) => (
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					<li key={todo.id!} className="flex items-center p-2 border rounded">
						<input
							type="checkbox"
							checked={todo.completed || false}
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							onChange={() => handleToggleTodo(todo.id!)}
							className="mr-2 h-5 w-5"
						/>
						<span
							className={todo.completed ? "line-through text-gray-500" : ""}
						>
							{todo.text}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
