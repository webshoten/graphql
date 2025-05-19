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

export type Folder = {
  __typename?: 'Folder';
  createdAt?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFolder?: Maybe<Folder>;
  addTodo?: Maybe<Todo>;
  toggleTodo?: Maybe<Todo>;
};


export type MutationAddFolderArgs = {
  createdAt: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationAddTodoArgs = {
  text: Scalars['String']['input'];
};


export type MutationToggleTodoArgs = {
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  folders?: Maybe<Array<Folder>>;
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
  text?: Maybe<Scalars['String']['output']>;
};

export type FoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type FoldersQuery = { __typename?: 'Query', folders?: Array<{ __typename?: 'Folder', createdAt?: number | null, id?: string | null, name?: string | null }> | null };


export const FoldersDocument = gql`
    query Folders {
  folders {
    createdAt
    id
    name
  }
}
    `;

export function useFoldersQuery(options?: Omit<Urql.UseQueryArgs<FoldersQueryVariables>, 'query'>) {
  return Urql.useQuery<FoldersQuery, FoldersQueryVariables>({ query: FoldersDocument, ...options });
};