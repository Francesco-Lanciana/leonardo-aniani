'use client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ApolloWrapper } from './ApolloWrapper';
import theme from '@/styles/theme';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ApolloWrapper>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                {children}
            </ChakraProvider>
        </ApolloWrapper>
    );
};

export default Providers;
