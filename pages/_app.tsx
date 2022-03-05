import { ChakraProvider, theme } from "@chakra-ui/react";
import { AuthContextProvider } from "store/auth-context";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
          <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  );
};

export default MyApp;
