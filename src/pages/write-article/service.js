import { ADD_ARTICLE, LOAD_CLASSIFY_FOR_USER } from './graphql';
import { ALL_ARTICLES } from '../home/graphql'
import { mutateRquestRefetch, query } from '../../dva/servises'

export async function loadClassifyForUser(params) {
  return await query(LOAD_CLASSIFY_FOR_USER, params);
}

export function mutateArticle(params) {
  return mutateRquestRefetch(ADD_ARTICLE, params,
    [
      { query: ALL_ARTICLES,variables:{pageNum:0,pageSize:20} },
      {
        query: LOAD_CLASSIFY_FOR_USER,
        variables: { userId: params.userId }
      }]);
}