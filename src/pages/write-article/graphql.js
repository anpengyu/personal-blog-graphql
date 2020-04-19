import { gql } from "apollo-boost";

export const ADD_ARTICLE = gql`
  mutation(
    $userId: ID!
    $articleTitle: String!
    $articleSubTitle: String!
    $articleContent: String!
    $course:String
    $label:[String]
  ) {
    createArticle(
      userId: $userId
      articleSubTitle: $articleSubTitle
      articleTitle: $articleTitle
      articleContent: $articleContent
      course:$course
      label:$label
    ) {
      userId
      articleSubTitle
      articleTitle
      articleContent
    }
  }
`;
