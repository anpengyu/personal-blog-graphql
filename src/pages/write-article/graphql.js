import { gql } from "apollo-boost";

export const ADD_ARTICLE = gql`
  mutation(
    $userId: ID!
    $articleTitle: String!
    $articleSubTitle: String!
    $articleContent: String!
  ) {
    createArticle(
      userId: $userId
      articleSubTitle: $articleSubTitle
      articleTitle: $articleTitle
      articleContent: $articleContent
    ) {
      userId
      articleSubTitle
      articleTitle
      articleContent
    }
  }
`;
