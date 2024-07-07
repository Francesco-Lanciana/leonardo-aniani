'use client';
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink } from '@apollo/client';
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';
import { NEXT_PUBLIC_GRAPHQL_API_URL } from '@/constants';

// have a function to create a client for you
function makeClient() {
    const httpLink = new HttpLink({
        uri: NEXT_PUBLIC_GRAPHQL_API_URL,
        fetchOptions: { cache: 'no-store' },
    });

    // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
    return new ApolloClient({
        // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
        cache: new InMemoryCache(),
        link: httpLink,
    });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
