import Articles from '../pages/home'
import ArticlePage from "../pages/article";
import WriteArticlePage from '../pages/write-article';
import Login from '../pages/login';
import UserInfoPage from '../pages/user';
import Loading from '../pages/Loading';

export default [
    { path: '/', name: 'Home', component: Articles },
    { path: '/article/:id', name: 'Article', component: ArticlePage },
    { path: '/write', name: 'WriteArticle', component: WriteArticlePage, auth: true },
    { path: "/login", name: "Login", component: Login },
    { path: "/userInfo/:id", name: "UserInfo", component: UserInfoPage },
    { path: "/Loading", name: "Loading", component: Loading },
]