import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo?: Maybe<Todo>;
  toggleTodo?: Maybe<Todo>;
};


export type MutationAddTodoArgs = {
  text: Scalars['String']['input'];
};


export type MutationToggleTodoArgs = {
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  todo?: Maybe<Todo>;
  todos?: Maybe<Array<Todo>>;
};


export type QueryTodoArgs = {
  id: Scalars['String']['input'];
};

export type Todo = {
  __typename?: 'Todo';
  completed?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  test?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = { __typename?: 'Query', todos?: Array<{ __typename?: 'Todo', id?: string | null, text?: string | null, completed?: boolean | null }> | null };

export type AddTodoMutationVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type AddTodoMutation = { __typename?: 'Mutation', addTodo?: { __typename?: 'Todo', id?: string | null, text?: string | null, completed?: boolean | null } | null };

export type ToggleTodoMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ToggleTodoMutation = { __typename?: 'Mutation', toggleTodo?: { __typename?: 'Todo', id?: string | null, text?: string | null, completed?: boolean | null } | null };


export const TodosDocument = gql`
    query Todos {
  todos {
    id
    text
    completed
  }
}
    `;

export function useTodosQuery(options?: Omit<Urql.UseQueryArgs<TodosQueryVariables>, 'query'>) {
  return Urql.useQuery<TodosQuery, TodosQueryVariables>({ query: TodosDocument, ...options });
};
export const AddTodoDocument = gql`
    mutation AddTodo($text: String!) {
  addTodo(text: $text) {
    id
    text
    completed
  }
}
    `;

export function useAddTodoMutation() {
  return Urql.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument);
};
export const ToggleTodoDocument = gql`
    mutation ToggleTodo($id: String!) {
  toggleTodo(id: $id) {
    id
    text
    completed
  }
}
    `;

export function useToggleTodoMutation() {
  return Urql.useMutation<ToggleTodoMutation, ToggleTodoMutationVariables>(ToggleTodoDocument);
};