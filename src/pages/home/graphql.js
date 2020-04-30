import { gql } from "apollo-boost";


export const ALL_ARTICLES = gql`
  # 获取所有文章/用户信息
  query AllArticles {
    allArticles {
      id
      articleTitle
      articleSubTitle
      articlePageView
      articlePraiseCount
      articleDisLikeCount
      articleCommentCount
      createDate
      user {
        id
        username
        sex
        headImg
      }
    }
  }
`;