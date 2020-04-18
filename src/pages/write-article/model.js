import { mutateArticle } from './service';

import { message } from 'antd';
export default {

  namespace: 'writeArticle',

  state: {
    userInfo: {},
    token: '',
  },

  subscriptions: {

  },

  effects: {
    //添加文章
    *mutateArticle({ payload ,history}, { call, select, put }) {
      console.log('payload', payload)
      let data = mutateArticle(payload)
      if (data) {
        message.info('文章发布成功~')
        history.push('/')
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