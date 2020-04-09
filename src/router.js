import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'

const menuGlobal = [
    {
        id: 'aaa',
        pid: '0',
        name: 'aaa页',
        icon: 'user',
        path: '/aaa',
        models: () => [import('./pages/aaa/model')], //models可多个
        component: () => import('./pages/aaa'),
    },
    {
        id: 'bbb',
        pid: '0',
        name: 'bbb页',
        icon: 'user',
        path: '/pages/bbb',
        models: () => [import('./pages/bbb/model')], //models可多个
        component: () => import('./pages/bbb'),
    },
    {
        id: 'ccc',
        pid: '0',
        name: 'ccc页',
        icon: 'user',
        path: '/pages/ccc',
        models: () => [import('./pages/ccc/model')], //models可多个
        component: () => import('./pages/ccc'),
    },
];

function RouterConfig({ history, app }) {

    return (
        <Router history={history}>
            <Switch>
                {
                    menuGlobal.map(({ path, ...dynamics }, index) => {
                        {console.log('path',path)}
                        <Route
                            key={index}
                            path={path}
                            exact
                            component={dynamic({
                                app,
                                ...dynamics
                            })}
                        />
                    })
                }
            </Switch>
        </Router>
    );
}
export default RouterConfig;