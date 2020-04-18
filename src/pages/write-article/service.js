import { ADD_ARTICLE } from './graphql';
import { ALL_ARTICLES } from '../home/graphql'
import {mutateRquestRefetch} from '../../dva/servises'

export function mutateArticle(params) {
  return  mutateRquestRefetch(ADD_ARTICLE,params,ALL_ARTICLES);
}