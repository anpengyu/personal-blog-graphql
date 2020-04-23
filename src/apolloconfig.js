import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error';
import { AUTH_TOKEN } from './utils/Constant';

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : '',
            // authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcHlheGQiLCJsb2dpblRpbWUiOiIyMDIwLTMtOC0xNi01My0xOSIsImlhdCI6MTU4NjMzNTk5OX0.AkixwdG20-zx4hhIjXE-hNjOyZCiRJ3eLX1G7G3-pGk'
        },
    }
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
        }
    },
);
const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:7002/graphql'
})
const link = ApolloLink.from([errorLink, authLink, httpLink]);
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default client;