export default {

  namespace: 'home',

  state: {
    name: 'home'
  },

  subscriptions: {

  },

  effects: {
    *loadData({ payload }, { call,select, put }) {
      const { name } = yield select((state) => state.home);
      console.log('payload',payload.name)
      yield put({
        type:'updateState',
        payload:{
          name:payload.name
        }
      })
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