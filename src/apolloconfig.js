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
    console.log('request', operation)
    // 可以设置token
    operation.setContext({
        headers: {}
    })
    return Promise.resolve()
}


const requestLink = new ApolloLink((operation: Operation, forward: NextLink) => {
    console.log('operation', operation)
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
                console.log('handle', handle)
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
            console.log(`[Network error]: ${networkError}`);
            switch (networkError.statusCode) {
                case 401:
                    message.error('请先登录');
                    break;
                case 402:
                    message.error('网络错误')
                    break;
            }
        }
    },
);
const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:7001/graphql',
    credentials: 'same-origin'
})
const link = ApolloLink.from([requestLink, errorLink, httpLink]);
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default client;