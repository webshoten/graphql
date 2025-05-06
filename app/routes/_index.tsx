// app/routes/_index.tsx
"use client";

import TodoList from "../components/TodoList";

export default function Index() {
	return (
		<div className="container mx-auto p-4">
			<TodoList />
		</div>
	);
}
