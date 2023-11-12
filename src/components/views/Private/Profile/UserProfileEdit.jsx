import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Flex,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import useModal from "../../../../hooks/useModal";
import useStorage from "../../../../hooks/useStorage";
import useAuth from "../../../../hooks/useAuth";
import DropZoneModal from "../../../common/Modal/DropZoneModal";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UserProfileEdit() {
  const { register, handleSubmit } = useForm();

  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
  const { uploadFile, url } = useStorage();
  const { currentUser, updateUserProfile, resetPassword } = useAuth();
  const navigate = useNavigate();
  const onFileChange = async (file) => {
    await uploadFile(file, "profile", "profile.png");
  };
  const [profilePicture, setProfilePicture] = useState(currentUser.photoURL);
  useEffect(() => {
    if (url) {
      setProfilePicture(url);
    }
  }, [url]);
  const { Modal, onOpen } = useModal(DropZoneModal, {
    title: "Select profile image",
    onFileChange: onFileChange,
  });

  const onRemoveProfileImage = async () => {
    setProfilePicture(defaultProfilePicture);
  };

  const onSubmit = async (data) => {
    const { displayName } = data;
    console.log(data);
    await updateUserProfile({
      photoURL: profilePicture !== currentUser.photoURL ? profilePicture : null,
      displayName: displayName !== currentUser.displayName ? displayName : null,
    });
  };
  const onResetPassword = () => {
    resetPassword(currentUser.email);
  };

  return (
    <>
      <Modal />
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        h={"min-content"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={2}
        mt={12}
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar
                size="xl"
                src={profilePicture ? profilePicture : defaultProfilePicture}
              >
                <AvatarBadge
                  as={IconButton}
                  onClick={onRemoveProfileImage}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button onClick={onOpen} w="full">
                Change Icon
              </Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
            defaultValue={currentUser.displayName}
            {...register("displayName", {
              required: true,
              maxLength: 20,
              minLength: 3,
            })}
          />
        </FormControl>

        <Button onClick={onResetPassword} w="full">
          Reset Password
        </Button>
        <Flex gap={6}>
          <Button w={120} colorScheme="red" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" w="full" variant={"accent"}>
            Submit
          </Button>
        </Flex>
      </Stack>
    </>
  );
}
