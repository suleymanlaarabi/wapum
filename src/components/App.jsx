import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "../services/router";
import { defaultTheme } from "../assets/themes/defaultTheme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
export default App;
