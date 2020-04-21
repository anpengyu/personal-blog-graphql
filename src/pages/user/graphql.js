import { gql } from "apollo-boost";

//用户中心获取用户信息
export const USER_INFO = gql`
  query UserInfo($id:ID!){
    user(id:$id){
      id
      username
      headImg
      articles{
          id
          articleTitle
          articleContent
          articlePraiseCount
          articleDislikeCount
          articlePageView
          articleCommentCount
          updated_at
          created_at
          articleSubTitle
      }
      classify{
        id
        name
        detail
      }
    }
  }
`;