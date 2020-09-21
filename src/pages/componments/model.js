export default {

  namespace: 'titleComponent',

  state: {
    currentTab:0,
  },

  subscriptions: {

  },

  effects: {
    *loadData({ payload }, { call,select, put }) {
     
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