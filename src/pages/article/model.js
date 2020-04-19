import { mutateComment } from './service';

import { message } from 'antd';
export default {

  namespace: 'article',

  state: {
    userInfo: {},
    token: '',
  },

  subscriptions: {

  },

  effects: {
    //发表评论
    *mutateComment({ payload, refetchVariables }, { call, select, put }) {
      console.log('refetchVariables',refetchVariables)
      let data = mutateComment(payload,refetchVariables)
      // if (data) {
      //   message.info('评论发布成功~')
      // }
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