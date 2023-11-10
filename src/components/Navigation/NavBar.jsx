import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useAuth from "../../hooks/useAuth";
import UserMenu from "./UserMenu";
import { NavLink } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
export default function NavBar() {
  const { currentUser } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <NavLink to={"/"}>
            <Heading fontSize={30}>Wapum</Heading>
          </NavLink>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={3}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <IconButton
                as={NavLink}
                to={"/private/annonces/create-annonces"}
                icon={<AddIcon />}
              />
              {currentUser ? (
                <UserMenu />
              ) : (
                <Button as={NavLink} to="/auth/sign-in">
                  Sign In
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
