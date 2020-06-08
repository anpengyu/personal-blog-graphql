import { gql } from "apollo-boost";


/**
 * 登录
 */
export const LOGIN = gql`
query login($username:String!,$password:String!,$rememberMe:Boolean){
  login(username:$username,password:$password,rememberMe:$rememberMe){
    token
    id
    response{
      code
      message
    }
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
      response{
        code
        message
    }
    }
  }
`;

//注册
export const REGISTER = gql`
  mutation register($username:String!,$password:String!,$repassword:String!,$phone:String!){
    register(username:$username,password:$password,repassword:$repassword,phone:$phone){
      id
      response{
        code
        message
      }
    }
  }
`;