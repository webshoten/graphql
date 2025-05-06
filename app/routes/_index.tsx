// app/routes/_index.tsx
'use client';

import { gql, useQuery } from "urql";

const GREET_QUERY = gql`
  query MyQuery($name: String!) {
    greet(name: $name)
  }
`;

export default function Index() {
  const [result] = useQuery({
    query: GREET_QUERY,
    variables: { name:"test" },
  });

  if(result.fetching) return <>loading</>
  return <h1>{JSON.stringify(result.data)}</h1>;
}