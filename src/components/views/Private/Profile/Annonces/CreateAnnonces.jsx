import {
  Heading,
  Flex,
  FormControl,
  Input,
  FormLabel,
  Button,
  Textarea,
  Select,
  HStack,
  Progress,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DropZone } from "../../../../common/DropZone/DropZone";
import { useState } from "react";
import useFirestore from "../../../../../hooks/useFirestore";
import { useAuth } from "../../../../../hooks/useAuth";
import useStorage from "../../../../../hooks/useStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateAnnonces = () => {
  const maxImages = 5;

  const navigate = useNavigate("/private/annonces/my-annonces");
  const { currentUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const { createDocument } = useFirestore("annonces");
  const { uploadFile, url, isLoading } = useStorage();

  const [images, setImages] = useState([]);
  const [prevUrl, setPrevUrl] = useState(null);
  const [isInLoading, setIsInLoading] = useState(false);

  useEffect(() => {
    if (url !== prevUrl) {
      setImages((current) => [...current, url]);
      setPrevUrl(url);
    }
  }, [url, prevUrl]);

  const onFileChange = async (file) => {
    const randomName = Math.random().toString(36).substring(2);
    await uploadFile(file, randomName);
  };

  const onSubmit = async (data) => {
    setIsInLoading(true);
    await createDocument({
      ...data,
      userId: currentUser.email,
      images: images,
    });
    navigate("/private/annonces/my-annonces");
    setIsInLoading(false);
  };

  return (
    <>
      {/* Annonces Formulaire */}
      <Flex
        align={"center"}
        flexDirection={"column"}
        as={"form"}
        w={"90vw"}
        onSubmit={handleSubmit(onSubmit)}
        gap={5}
      >
        <Heading>Create Annonces</Heading>
        {isInLoading ? (
          <>
            <Progress
              height={2}
              borderRadius={3}
              w={"full"}
              size="xs"
              isIndeterminate
            />
          </>
        ) : (
          <>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                type="text"
                placeholder="Description"
                {...register("description", { required: true })}
              />
            </FormControl>
            <FormControl id="price" isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
              />
            </FormControl>
            <FormControl id="category" isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                {...register("category", { required: true })}
              >
                <option value="smartphone">Smartphone</option>
                <option value="table">Table</option>
                <option value="car">Car</option>
              </Select>
            </FormControl>
            <FormControl id="location" isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                placeholder="Location"
                {...register("location", { required: true })}
              />
            </FormControl>
            {images.length < maxImages ? (
              <DropZone onFileChange={onFileChange} />
            ) : (
              <Text>You can only upload up to {maxImages} images</Text>
            )}

            {isLoading && (
              <Flex w={"full"} justifyContent={"center"}>
                <Spinner />
              </Flex>
            )}
            <Flex gap={5}>
              {images.map((image) => (
                <img width={100} key={image} src={image} alt="test" />
              ))}
            </Flex>

            <HStack w={"full"} justifyContent={"flex-end"}>
              <Button
                colorScheme="red"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button variant={"accent"} type="submit">
                Create
              </Button>
            </HStack>
          </>
        )}
      </Flex>
    </>
  );
};

export default CreateAnnonces;
