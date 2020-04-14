let moment = require('moment');

export const CHANGE_USER_INFO_TYPE = {
    LIKES:1,//点赞
    COLLECTS:2,//收藏
    HISTORY:3,//浏览记录
    ATTENTION:4,//关注的作者
    COMMENT:5,//发布的评论
    ARTICLE:6//发布的文章
}

export const AUTH_TOKEN = 'auth-token'
export const CONSTANT_USER_INFO = 'user_info'
export const LAST_PATH_NAME = 'lastPathname';

export function times(date) {
    return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').fromNow();
}

export default {
    times,
    CHANGE_USER_INFO_TYPE,
    AUTH_TOKEN
}