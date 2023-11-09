import { useDropzone } from "react-dropzone";
import { Container } from "@chakra-ui/react";
import { AiFillFileAdd } from "react-icons/ai";
import { Text } from "@chakra-ui/react";
export function DropZone({ onFileChange }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onFileChange(acceptedFiles[0]);
    },
  });

  return (
    <Container
      {...getRootProps()}
      maxW={"container.xl"}
      p={5}
      borderRadius={"md"}
      border={"dashed"}
      borderColor={"gray.400"}
      textAlign={"center"}
      cursor={"pointer"}
      _hover={{
        borderColor: "gray.500",
        backgroundColor: "rgba(155,155,155,0.1)",
      }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <input {...getInputProps()} />
      <AiFillFileAdd size={"3em"} />
      <Text>
        Drag &rsquo;n&rsquo; drop some files here, or click to select files
      </Text>
    </Container>
  );
}
