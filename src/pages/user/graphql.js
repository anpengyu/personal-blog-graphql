import { gql } from "apollo-boost";

//登录后获取简单的用户信息
export const USER_INFO = gql`
  query UserInfo($id:ID!){
    user(id:$id){
      id
      username
      headImg
      classify{
        id
        name
        detail
      }
    }
  }
`;

//用户中心获取用户信息
export const USER_DETAIL_INFO = gql`
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
          articleDisLikeCount
          articlePageView
          articleCommentCount
          updated_at
          createDate
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