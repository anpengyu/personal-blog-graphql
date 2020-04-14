
export default {

    namespace: 'user',

    state: {
        allArticles: ['1', 'a', 'b']
    },

    subscriptions: {

    },

    effects: {
        //根据用户教程id获取文章
         *loadAuthArticleForCourse({ payload }, { call, select, put }) {
            
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