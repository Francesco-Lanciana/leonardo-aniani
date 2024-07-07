'use client';

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloWrapper } from './ApolloWrapper';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ApolloWrapper>
            <ChakraProvider>{children}</ChakraProvider>
        </ApolloWrapper>
    );
};

export default Providers;
