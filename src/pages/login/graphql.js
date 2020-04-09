import { gql } from "apollo-boost";


/**
 * 登录
 */
export const LOGIN = gql`
query login($username:String!,$password:String!){
  login(username:$username,password:$password){
    token
  }
}
`
//登录之后获取用户信息
export const USER_INFO = gql`
  query UserInfo{
    user{
      id
      username
      headImg
    }
  }
`;