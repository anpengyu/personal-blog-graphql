import { gql } from "apollo-boost";

// 文章详情（包含评论，评论中所有用户）
export const ARTICLE_DETIAL = gql`
  # 根据文章id获取文章详情
  query ArticleDetail($id: ID!) {
    article(id: $id) {
      id
      articleTitle
      articleContent
      articlePageView
      articlePraiseCount
      articleDislikeCount
      articleCommentCount
      created_at
      user {
        id
        username
        headImg
        sex
      }
      comment {
        articleId
        id
        content
        created_at
        liks
        rootCommentId
        creator {
          id
          username
          sex
          headImg
        }
        comment {
          articleId
          id
          content
          created_at
          rootCommentId
          replyToCommentId
          liks
          creator {
            id
            username
            sex
            headImg
          }
          replyTo {
            id
            username
            headImg
            sex
          }
        }
      }
    }
  }
`;

//添加评论
export const ADD_COMMENT = gql`
  mutation createComment(
    $userId: ID!
    $articleId: String!
    $content: String!
    $replyToCommentId: String!
    $rootCommentId: String!
  ) {
    createComment(
      userId: $userId
      articleId: $articleId
      content: $content
      replyToCommentId: $replyToCommentId
      rootCommentId: $rootCommentId
    ) {
      userId
      articleId
      content
      replyToCommentId
      rootCommentId
    }
  }
`;

// 添加查看文章次数
export const ADD_WATCH_COUNT = gql`
mutation addWatchCount($articleId:ID!){
  addWatchCount(articleId:$articleId){
    articlePageView
  }
}
`