import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Savings from './containers/Savings'
import theme from './theme'

const defaultTheme = extendTheme(theme)

const App = () => {
    return (
        <ChakraProvider theme={defaultTheme}>
            <Savings />
        </ChakraProvider>
    )
}

export default App
