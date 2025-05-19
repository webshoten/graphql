import { gql } from "urql";

export const FoldersQuery = gql`
query Folders {
  folders{
    createdAt
    id
    name
  }
}
`;
