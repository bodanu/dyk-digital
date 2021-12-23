import '../styles/globals.css'
import { Sanctum } from "react-sanctum";
import { ChakraProvider } from '@chakra-ui/react';
import theme from './../theme';
import Nav from './../components/Navbar';
import Floater from './../components/utils/Floater';

function MyApp({ Component, pageProps }) {

const sanctumConfig = {
  apiUrl: process.env.REACT_APP_API_URL,
  csrfCookieRoute: "sanctum/csrf-cookie",
  signInRoute: "api/login",
  signOutRoute: "api/logout",
  userObjectRoute: "api/user",
};


  return (
    <Sanctum config={sanctumConfig}>
      <ChakraProvider theme={theme}>
      <Nav/>
        <Component {...pageProps} />
      <Floater />
      </ChakraProvider>
    </Sanctum>
  )
}

export default MyApp
