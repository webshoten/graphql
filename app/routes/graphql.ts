import { createYoga } from 'graphql-yoga';
import { schema } from '../graphql/schema';
import type { LoaderFunction } from '@remix-run/node';

const yoga = createYoga<{
  req: Request
}>({
  graphqlEndpoint: '/graphql',
  schema,
  fetchAPI: globalThis,
});

export const loader: LoaderFunction = async ({ request }) => {
  return yoga.handleRequest(request, { req: request });
};

export const action: LoaderFunction = async ({ request }) => {
  return yoga.handleRequest(request, { req: request });
};