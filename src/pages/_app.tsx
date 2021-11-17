import { AppProps } from 'next/app'
import { ChakraProvider} from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { makeServer } from '../services/mirage'
import { ReactQueryDevtools } from 'react-query/devtools'

import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/mirage/queryClient'
import { AuthProvider } from '../contexts/AuthContext'

// if(process.env.NODE_ENV === 'development'){
//   makeServer()
// }

function AcheplusApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default AcheplusApp
