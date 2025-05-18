import SchemaBuilder from "@pothos/core";

// 型定義
export interface Todo {
	id: string;
	text: string;
	completed: boolean;
}
export interface Folder {
	id: string;
	name: string;
	createdAt: number;
}

const builder = new SchemaBuilder<{
	Objects: {
		Todo: Todo;
		Folder: Folder;
	};
}>({});

// Todo 型の定義
builder.objectType("Todo", {
	fields: (t) => ({
		id: t.exposeString("id"),
		text: t.exposeString("text"),
		completed: t.exposeBoolean("completed"),
	}),
});
builder.objectType("Folder", {
	fields: (t) => ({
		id: t.exposeString("id"),
		name: t.exposeString("name"),
		createdAt: t.exposeFloat("createdAt"),
	}),
});

// ダミーデータ
const todos: Todo[] = [
	{ id: "1", text: "GraphQLを学ぶ", completed: false },
	{ id: "2", text: "Todoアプリを作成", completed: false },
];
const folders: Folder[] = [
	{ id: "1", name: "202505", createdAt: new Date().getTime() },
];

builder.queryType({
	fields: (t) => ({
		folders: t.field({
			type: ["Folder"],
			resolve: () => folders,
		}),
		todos: t.field({
			type: ["Todo"],
			resolve: () => todos,
		}),
		todo: t.field({
			type: "Todo",
			nullable: true,
			args: {
				id: t.arg.string({ required: true }),
			},
			resolve: (_, args) => {
				return todos.find((todo) => todo.id === args.id) || null;
			},
		}),
	}),
});

builder.mutationType({
	fields: (t) => ({
		addTodo: t.field({
			type: "Todo",
			args: {
				text: t.arg.string({ required: true }),
			},
			resolve: (_, args) => {
				const newTodo = {
					id: String(todos.length + 1),
					text: args.text,
					completed: false,
				};
				todos.push(newTodo);
				return newTodo;
			},
		}),
		toggleTodo: t.field({
			type: "Todo",
			nullable: true,
			args: {
				id: t.arg.string({ required: true }),
			},
			resolve: (_, args) => {
				const todo = todos.find((todo) => todo.id === args.id);
				if (!todo) return null;
				todo.completed = !todo.completed;
				return todo;
			},
		}),
	}),
});

export const schema = builder.toSchema();
