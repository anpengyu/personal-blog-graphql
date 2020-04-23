import { gql } from "apollo-boost";


/**
 * 登录
 */
export const LOGIN = gql`
query login($username:String!,$password:String!){
  login(username:$username,password:$password){
    token
    id
  }
}
`
//登录之后获取用户信息
export const USER_INFO = gql`
  query UserInfo($id:ID!){
    user(id:$id){
      id
      username
      headImg
      likes
      collects
      comments
      historys
      attention
    }
  }
`;