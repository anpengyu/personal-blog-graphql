import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, Observable } from 'apollo-link';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error';
import { AUTH_TOKEN } from './utils/Constant';
import Loading from './pages/Loading/index'
import React from 'react'
import { message } from 'antd';

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            // authorization: token ? `${token}` : '',
            // authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcHlheGQiLCJsb2dpblRpbWUiOiIyMDIwLTMtOC0xNi01My0xOSIsImlhdCI6MTU4NjMzNTk5OX0.AkixwdG20-zx4hhIjXE-hNjOyZCiRJ3eLX1G7G3-pGk'
        },
    }
})

// 请求拦截器
const request = async (operation: Operation) => {
    // 可以设置token
    operation.setContext({
        headers: {}
    })
    return Promise.resolve()
}


const requestLink = new ApolloLink((operation: Operation, forward: NextLink) => {
    return new Observable(observer => {
        let handle: any;
        Promise.resolve(operation)
            .then(oper => request(oper))
            .then(() => {
                handle = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                });
            })
            .catch(observer.error.bind(observer));

        return () => {
            if (handle) {
                handle.unsubscribe()
            }
        }

    })
})



const errorLink = onError(
    ({ graphQLErrors, networkError, response, operation, forward }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                        locations,
                    )}, Path: ${path}`,
                ),
            );
        }
        if (networkError) {
            let result = networkError.result;
            let msg = networkError.result.message.message;
            switch (networkError.statusCode) {
                case 400://参数错误
                    message.error(msg && msg);
                    break;
                case 401://未登录
                    message.error(result.msg);
                    break;
                case 402:
                    window.location.href = '/Loading'
                    break;
                default:
                    // window.location.href = '/Loading'
                    break;
            }
        }
    },
);
const httpLink = createHttpLink({
    uri: '/graphql',
    // credentials: 'include'
    // credentials: 'same-origin'
})
const link = ApolloLink.from([requestLink, errorLink, httpLink]);
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default client;