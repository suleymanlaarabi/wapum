import { Flex, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
const PageContainer = ({ children }) => {
  const location = useLocation();
  return (
    <Flex
      height={"100vh"}
      maxW={"100vw"}
      bg={useColorModeValue("gray.50", "gray.800")}
      pt={10}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        key={location.pathname}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {children}
      </motion.div>
    </Flex>
  );
};

export default PageContainer;
