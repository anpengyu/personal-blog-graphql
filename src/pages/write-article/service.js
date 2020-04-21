import { ADD_ARTICLE, LOAD_CLASSIFY_FOR_USER } from './graphql';
import { ALL_ARTICLES } from '../home/graphql'
import { mutateRquestRefetch, query } from '../../dva/servises'

export async function loadClassifyForUser(params){
  const d = await query(LOAD_CLASSIFY_FOR_USER,params);
  console.log('........',d)
  return d
}

export function mutateArticle(params) {
  return mutateRquestRefetch(ADD_ARTICLE, params, ALL_ARTICLES);
}