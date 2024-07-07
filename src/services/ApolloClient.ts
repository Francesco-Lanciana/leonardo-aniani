import { HttpLink } from '@apollo/client';
import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import { NEXT_PUBLIC_GRAPHQL_API_URL } from '@/constants';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: NEXT_PUBLIC_GRAPHQL_API_URL,
        }),
    });
});
