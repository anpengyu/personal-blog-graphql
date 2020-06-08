
export default {

  namespace: 'login',

  state: {
    selectTitle: 0,
    enumTitle: {
      LoginSelect: 0,
      RegisterSelect: 1
    },
    username:'',
    password:'',
  },

  subscriptions: {

  },

  effects: {
    *loadData({ payload }, { call, select, put }) {
      console.log('payload', payload)
      const { name } = yield select((state) => state.home);
      console.log('payload', payload.name)
      yield put({
        type: 'updateState',
        payload: {
          name: payload.name
        }
      })
    },
  },

  reducers: {
    updateState(state, { payload }) {
      console.log('payload',payload)
      return {
        ...state,
        ...payload,
      };
    },
  },

};