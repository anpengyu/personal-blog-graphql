import _ from 'lodash';
import { message } from 'antd';
import { eq } from 'semver';

let moment = require('moment');

export const CHANGE_USER_INFO_TYPE = {
    LIKES: 1,//点赞
    COLLECTS: 2,//收藏
    HISTORY: 3,//浏览记录
    ATTENTION: 4,//关注的作者
    COMMENT: 5,//发布的评论
    ARTICLE: 6//发布的文章
}

export const AUTH_TOKEN = 'auth-token'
export const CONSTANT_USER_INFO = 'user_info'
export const LAST_PATH_NAME = 'lastPathname';

export function times(date) {
    return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').fromNow();
}

export function randomId() {
    var arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var rand1 = Math.floor((Math.random() * 62));
    var rand2 = Math.floor((Math.random() * 62));
    var rand3 = Math.floor((Math.random() * 62));
    var rand4 = Math.floor((Math.random() * 62));
    var rand5 = Math.floor((Math.random() * 62));
    var rand6 = Math.floor((Math.random() * 62));
    alert("验证码为: " + " " + arr[rand1] + " " + arr[rand2] + " " + arr[rand3] + " " + arr[rand4] + " " + arr[rand5] + " " + arr[rand6]);
    return arr[rand1] + arr[rand2] + arr[rand3] + arr[rand4] + arr[rand5] + arr[rand6]
}

export function loadUserInfo() {
    let userInfo = localStorage.getItem(CONSTANT_USER_INFO)
    let token = localStorage.getItem(AUTH_TOKEN);
    if (!_.isEmpty(userInfo) && !_.eq('undefined', userInfo) && !_.isEmpty(token)) {
        return JSON.parse(userInfo);
    }
    return null;
}

export function loadUserId() {
    return loadCurrentUserId(true)
}

export function loadCurrentUserId(showMessage) {
    let userInfo = localStorage.getItem(CONSTANT_USER_INFO)
    let token = localStorage.getItem(AUTH_TOKEN);
    if (!_.isEmpty(userInfo) && !_.eq('undefined', userInfo) && !_.isEmpty(token)) {
        return JSON.parse(userInfo).id;
    } else {
        if (showMessage) {
            message.info('请先登录')
        }
        return null;
    }
}

export default {
    times,
    randomId,
    loadUserInfo,
    CHANGE_USER_INFO_TYPE,
    AUTH_TOKEN,

}