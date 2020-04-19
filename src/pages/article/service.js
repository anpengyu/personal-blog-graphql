import { ADD_COMMENT, ARTICLE_DETIAL } from './graphql';
import { mutateRquestRefetchVariables } from '../../dva/servises'

export function mutateComment(params,refetchVariables) {
  return mutateRquestRefetchVariables(ADD_COMMENT, params, ARTICLE_DETIAL,refetchVariables);
}