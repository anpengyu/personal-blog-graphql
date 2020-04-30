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
      articleDisLikeCount
      articleCommentCount
      createDate
      user {
        id
        username
        headImg
        sex
        likes
        attention
        collects
        historys
      }
      comment {
        articleId
        id
        content
        createDate
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
          createDate
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
      classify{
          id
          name
          detail
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

/**
 * 点赞
 */
export const ADD_PRAISE_COUNT = gql`
mutation addPraiseCount($articleId:ID!,$flag:Int!,$type:Int!){
  addPraiseCount(articleId:$articleId,flag:$flag,type:$type){
    id
  }
}
`

/**
 * 1:点赞列表 2:收藏列表 3:浏览记录 4:关注的作者 5:评论列表 6:文章列表
 */
export const CHANGE_USERINFO = gql`
mutation changeUserInfo($userId:ID!,$id:ID!,$type:Int!){
  changeUserInfo(userId:$userId,id:$id,type:$type){
    likes
    collects
  }
}
`
