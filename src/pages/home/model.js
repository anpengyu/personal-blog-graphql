export default {

  namespace: 'home',

  state: {
    userInfo: {},
    token:'',
  },

  subscriptions: {

  },

  effects: {
    *loadData({ payload }, { call,select, put }) {
      console.log('payload',payload)
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