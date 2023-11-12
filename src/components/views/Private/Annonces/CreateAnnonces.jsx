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
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { DropZone } from "../../../common/DropZone/DropZone";
import { useState } from "react";
import useFirestore from "../../../../hooks/useFirestore";
import useAuth from "../../../../hooks/useAuth";
import useStorage from "../../../../hooks/useStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../../../utils/helpers/firebase.helper";

const CreateAnnonces = () => {
  const maxImages = 5;
  const toast = useToast();

  const navigate = useNavigate("/private/annonces/my-annonces");
  const { currentUser } = useAuth();
  const { register, handleSubmit, watch, control } = useForm();

  const [category, setCategory] = useState("");

  const optionsByCategory = {
    electronics: ["Computer", "Laptop", "Smartphone", "Tablet", "Other"],
    vehicles: ["Car", "Motorcycle", "Bike", "Other"],
    realEstate: ["House", "Apartment", "Other"],
    clothing: ["Shirt", "Pants", "Shoes", "Other"],
    furniture: ["Chair", "Table", "Bed", "Other"],
  };

  const selectedCategory = watch("category");

  const { createDocument } = useFirestore("annonces");
  const { uploadFile, url, isLoading } = useStorage();

  const [images, setImages] = useState([]);
  const [isInLoading, setIsInLoading] = useState(false);

  useEffect(() => {
    if (!images.includes(url) && url) {
      setImages((current) => [...current, url]);
    }
  }, [images, url]);

  const onFileChange = async (file) => {
    const randomName = Math.random().toString(36).substring(2);
    await uploadFile(file, "images", randomName);
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast(
        createToast("Error", "You must upload at least one image", "error")
      );
      return;
    }

    setIsInLoading(true);
    await createDocument({
      ...data,
      images,
      userId: currentUser.email,
    });

    setIsInLoading(false);
    navigate("/private/annonces/my-annonces");
  };

  return (
    <>
      <Flex
        align={"center"}
        flexDirection={"column"}
        as={"form"}
        w={"90vw"}
        onSubmit={handleSubmit(onSubmit)}
        gap={5}
        mt={12}
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
            <Flex w={"full"} gap={5}>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("title", { required: true })}
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
            </Flex>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                type="text"
                placeholder="Description"
                {...register("description", { required: true })}
              />
            </FormControl>

            <Flex w={"full"} gap={5}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        field.onChange(e);
                      }}
                    >
                      <option value="">Select a category</option>
                      {Object.keys(optionsByCategory).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              {category && (
                <FormControl>
                  <FormLabel>{selectedCategory} type</FormLabel>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select {...field}>
                        {optionsByCategory[category].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              )}
            </Flex>

            {/*  street adress ... */}
            <FormControl id="adress" isRequired>
              <FormLabel>Adress</FormLabel>
              <Input
                type="text"
                placeholder="Adress"
                {...register("adress", { required: true })}
              />
            </FormControl>
            <Flex gap={5} w={"full"}>
              <FormControl id="city" isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  placeholder="City"
                  {...register("city", { required: true })}
                />
              </FormControl>
              <FormControl id="zipCode" isRequired>
                <FormLabel>Zip Code</FormLabel>
                <Input
                  type="text"
                  placeholder="Zip Code"
                  {...register("zipCode", { required: true })}
                />
              </FormControl>
            </Flex>

            <FormControl id="country" isRequired>
              <FormLabel>Country</FormLabel>
              <Select>
                <option value="france">France</option>
                <option value="germany">Germany</option>
                <option value="spain">Spain</option>
                <option value="italy">Italy</option>
                <option value="ireland">Ireland</option>
                <option value="united kingdom">United Kingdom</option>
                <option value="united states">United States</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="other">Other</option>
              </Select>
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
