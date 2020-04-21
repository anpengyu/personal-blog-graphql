import { mutateArticle, loadClassifyForUser } from './service';
import _ from 'lodash';

import { message } from 'antd';
export default {

  namespace: 'writeArticle',

  state: {
    userInfo: {},
    token: '',
    classify:[]
  },

  subscriptions: {

  },

  effects: {
    //添加文章
    *mutateArticle({ payload, history }, { call, select, put }) {
      console.log('payload', payload)
      let data = mutateArticle(payload)
      if (data) {
        message.info('文章发布成功~')
        history.push('/')
      }
    },

    *loadClassifyForUser({ payload }, { call, select, put }) {
      let data = yield loadClassifyForUser(payload)
      console.log('data',data)
      if(!_.isEmpty(data)){
      
        yield put({
          type:'updateState',
          payload:{
            classify:data
          }
        })
      }
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

};