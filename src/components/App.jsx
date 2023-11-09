import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "../services/router";
import { defaultTheme } from "../assets/themes/defaultTheme";

function App() {
  return (
    <ChakraProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
export default App;
