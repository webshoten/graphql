import { gql } from 'urql';

export const GREET_QUERY = gql`
  query Greet($name: String!) {
    greet(name: $name)
  }
`;