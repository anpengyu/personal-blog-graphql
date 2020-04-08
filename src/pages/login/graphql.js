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