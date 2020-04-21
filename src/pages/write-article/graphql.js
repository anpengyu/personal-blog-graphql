import { gql } from "apollo-boost";

export const ADD_ARTICLE = gql`
  mutation(
    $userId: ID!
    $articleTitle: String!
    $articleSubTitle: String!
    $articleContent: String!
    $course:String
    $label:[String]
    $original:Boolean
    $privacy:Boolean
    $originalUrl:String
  ) {
    createArticle(
      userId: $userId
      articleSubTitle: $articleSubTitle
      articleTitle: $articleTitle
      articleContent: $articleContent
      course:$course
      label:$label
      original:$original
      privacy:$privacy
      originalUrl:$originalUrl
    ) {
      userId
      articleSubTitle
      articleTitle
      articleContent
    }
  }
`;
