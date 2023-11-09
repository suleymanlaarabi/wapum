import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../hooks/useAuth";

export default function SignUp() {
  const { register: createUser, registerWithGoogle } = useAuth();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(<></>);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setErrors(
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Password</AlertTitle>
          <AlertDescription>Passwords do not match.</AlertDescription>
        </Alert>
      );
      return;
    }
    try {
      const user = await createUser(data.email, data.password);
      console.log(user);
    } catch (error) {
      setErrors(
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      );
    }
  };

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
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign up
        </Heading>
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
        <Stack as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                {...register("confirmPassword", {
                  required: true,
                  minLength: 6,
                })}
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {errors}
          <Stack spacing={5} pt={3}>
            <Button
              type="submit"
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Sign up
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
            Already have an account?{" "}
            <NavLink to="/auth/sign-in">
              <Text as={"span"} color={"blue.400"}>
                Sign in
              </Text>
            </NavLink>
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
}
