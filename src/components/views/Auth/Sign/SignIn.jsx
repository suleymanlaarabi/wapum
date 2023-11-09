import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";

export default function SignIn() {
  const { login, registerWithGoogle } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = ({ email, password }) => login(email, password);
  return (
    <Stack
      textAlign={"center"}
      spacing={8}
      mx={"auto"}
      maxW={"lg"}
      py={12}
      px={6}
      w={"full"}
    >
      <Stack>
        <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          to enjoy all of our cool{" "}
          <Text as={"span"} color={"blue.400"}>
            features
          </Text>{" "}
          ✌️
        </Text>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack as={"form"} onSubmit={handleSubmit(onSubmit)} spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              {...register("email", {
                required: true,
              })}
              type="email"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              {...register("password", {
                required: true,
              })}
              type="password"
            />
          </FormControl>
          <Stack spacing={5} pt={3}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={"blue.400"}>Forgot password?</Text>
            </Stack>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Sign in
            </Button>
            <Button
              onClick={registerWithGoogle}
              w={"full"}
              variant={"outline"}
              leftIcon={<FcGoogle />}
            >
              <Center>
                <Text>Sign in with Google</Text>
              </Center>
            </Button>
          </Stack>
          <Text mt={3}>
            Don&apos;t have an account?{" "}
            <NavLink to="/auth/sign-up">
              <Text as={"span"} color={"blue.400"}>
                Sign up
              </Text>
            </NavLink>
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
}
