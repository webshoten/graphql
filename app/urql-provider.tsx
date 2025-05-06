'use client';

import { ReactNode } from 'react';
import { Provider } from 'urql';
import { cacheExchange, createClient, fetchExchange } from '@urql/core';

export default function UrqlProvider({ children }: { children: ReactNode }) {
  const client = createClient({
    url: '/graphql',
    exchanges: [cacheExchange, fetchExchange],
  })

  return <Provider value={client}>{children}</Provider>;
}