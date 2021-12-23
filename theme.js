import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const styles = {
    global: {
        body: {
            maxHeight: '100vh'
        }
    }
}

const theme = extendTheme({ config, styles })


export default theme