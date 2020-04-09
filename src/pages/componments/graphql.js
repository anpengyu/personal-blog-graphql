import { gql } from "apollo-boost";


/**
 * 登录
 */
export const LOGOUT = gql`
query logout{
  logout{
    id
  }
}
`