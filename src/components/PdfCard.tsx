import React from "react";
import type { Pdf } from "../../types";
import { Flex, Heading, Icon, Link, Button, Text } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineDownload } from "react-icons/ai";
import ChakraNextImage from "./ChakraNextImage";

type PdfCardProps = {
    pdf: Pdf | undefined;
};

const PdfCard: React.FC<PdfCardProps> = ({pdf}) => {
  const seePdfUrl = pdf?.pdfUrl;

  return (
    <Flex
      key={pdf?._id}
      flexDir="column"
      w="250px"
      minH={{base: "230px", md:"370px"}}
      h={{base: "230px", md:"370px"}}
      align="center"
      bg="white"
      border="3px solid #3B7382"
    >
      <ChakraNextImage fit="contain" src="/assets/pdf.png" w="200px" h={{base: "40%", md: "50%"}} />
      <Flex
        flexDir="column"
        align="center"
        justify="space-evenly"
        h="50%"
        w="100%"
        p="4"
        borderTop="2px solid #3B7382"
      >
        <Heading
          as="h3"
          mt="2"
          fontSize={{base: "md", md: "lg"}}
          textAlign="center"
          w="100%"          
        >
          {pdf?.pdfTitle}
        </Heading>
        <Flex gap="2" mt="4">
          <Link href={seePdfUrl} isExternal>
            <Button bg="primary" _hover={{bg: ""}} _active={{bg: ""}}>
              <Text color="white">Ver PDF</Text>
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PdfCard;
