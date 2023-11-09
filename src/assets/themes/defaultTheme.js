import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/buttonTheme";

export const defaultTheme = extendTheme({
  components: {
    Alert: {
      // style pour toutes les variantes d'Alert
      baseStyle: {
        container: {
          borderRadius: "7px", // 'lg' est une valeur prédéfinie, vous pouvez utiliser une valeur personnalisée comme '12px'
        },
      },
    },
    Button,
  },
});
