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
  const navigate = useNavigate("/private/annonces/my-annonces");
  const { currentUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const onFileChange = async (file) => {
    const randomName = Math.random().toString(36).substring(2);
    await uploadFile(file, randomName);
  };
  const [prevUrl, setPrevUrl] = useState(null);
  const { uploadFile, url, isLoading } = useStorage();
  const [isInLoading, setIsInLoading] = useState(false);
  const { createDocument } = useFirestore("annonces");
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (url !== prevUrl) {
      setImages((current) => [...current, url]);
      setPrevUrl(url);
    }
  }, [url, prevUrl]);

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
              <FormLabel>Titre</FormLabel>
              <Input
                type="text"
                placeholder="Titre"
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
              <FormLabel>Prix</FormLabel>
              <Input
                type="number"
                placeholder="Prix"
                {...register("price", { required: true })}
              />
            </FormControl>
            <FormControl id="category" isRequired>
              <FormLabel>Catégorie</FormLabel>
              <Select
                placeholder="Choisir une catégorie"
                {...register("category", { required: true })}
              >
                <option value="cat1">Catégorie 1</option>
                <option value="cat2">Catégorie 2</option>
                <option value="cat3">Catégorie 3</option>
              </Select>
            </FormControl>
            <FormControl id="location" isRequired>
              <FormLabel>Localisation</FormLabel>
              <Input
                type="text"
                placeholder="Localisation"
                {...register("location", { required: true })}
              />
            </FormControl>
            <DropZone onFileChange={onFileChange} />
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
              <Button colorScheme="red">Cancel</Button>
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
