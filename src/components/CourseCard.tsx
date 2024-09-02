import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaPhotoVideo } from "react-icons/fa";
import ChakraNextImage from "./ChakraNextImage";

type Props = {
    src: string;
    alt: string;
    title: string;
    description: string;
    hours: number;
}

const CourseCard: React.FC<Props> = ({ src, alt, title, hours, description }) => {
    return (
        <>
            <Flex
                flexDir="column"
                bg="#fff"
                maxH="600px"
                maxW="300px"
                transition="all .2s ease"
                _hover={{
                    transform: "scale(1.1)",
                    boxShadow: "5px 5px 10px 0px #606060",
                }}
            >
                <Image
                    src={src}
                    w="250px"
                    h="250px"
                    alt={alt}
                    fit="cover"
                />
                <Flex p="1rem" flexDir="column" gap="1rem">
                    <Text fontFamily="primary" fontSize="14px" >
                        {title}
                    </Text>
                    <Text
                        fontFamily="primary"
                        fontSize="12px"
                        fontWeight="bold"
                        w="100%"
                        mb="1rem"
                        color="#606060"
                    >
                        {description}
                    </Text>
                    <Flex justifyContent="space-between">
                        <Flex gap=".5rem">
                            <Icon
                                as={FaPhotoVideo}
                                fontSize="2xl"
                                fill="secondary"
                            />
                            <Text fontFamily="secondary">2 Clases</Text>
                        </Flex>
                        <Flex gap=".5rem">
                            <Icon
                                as={AiOutlineClockCircle}
                                fontSize="2xl"
                                fill="secondary"
                            />
                            <Text fontFamily="secondary">{hours} Horas</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default CourseCard