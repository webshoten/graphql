import SchemaBuilder from '@pothos/core';

// 型定義
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  test: string;
}

const builder = new SchemaBuilder<{
  Objects: {
    Todo: Todo;
  };
}>({});

// Todo 型の定義
builder.objectType('Todo', {
  fields: (t) => ({
    id: t.exposeString('id'),
    text: t.exposeString('text'),
    completed: t.exposeBoolean('completed'),
    test: t.exposeString('test'),
  }),
});

// ダミーデータ
const todos: Todo[] = [
  { id: '1', text: 'GraphQLを学ぶ', completed: false,test:"" },
  { id: '2', text: 'Todoアプリを作成', completed: false ,test:""},
];

builder.queryType({
  fields: (t) => ({
    todos: t.field({
      type: ['Todo'],
      resolve: () => todos,
    }),
    todo: t.field({
      type: 'Todo',
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_, args) => {
        return todos.find(todo => todo.id === args.id) || null;
      },
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    addTodo: t.field({
      type: 'Todo',
      args: {
        text: t.arg.string({ required: true }),
      },
      resolve: (_, args) => {
        const newTodo = {
          id: String(todos.length + 1),
          text: args.text,
          completed: false,
          test:""
        };
        todos.push(newTodo);
        return newTodo;
      },
    }),
    toggleTodo: t.field({
      type: 'Todo',
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_, args) => {
        const todo = todos.find(todo => todo.id === args.id);
        if (!todo) return null;
        todo.completed = !todo.completed;
        return todo;
      },
    }),
  }),
});

export const schema = builder.toSchema();