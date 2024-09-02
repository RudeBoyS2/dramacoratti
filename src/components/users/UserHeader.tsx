import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { User } from "../../../types";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const UserHeader = ({ user }: { user: User | undefined }) => {
  return (
    <Flex
      fontFamily="secondary"
      gap="1rem"
      py="1rem"
      px="2rem"
      bg="#f1f2f3"
      w="100%"
    >
      <Image
        mt={{base: "1rem", md: "0"}}
        src="/profile.svg"
        width={{base: "80px", md: "120px"}}
        height={{base: "80px", md: "120px"}}
        borderRadius="50%"
        alt="profile"
      />
      <Flex flexDir="column" gap="2" pt="2">
        <Text fontSize={{base: "xl", md: "2xl"}}>{user?.name}</Text>
        <Flex gap="4" flexDir={{base: "column", lg: "row"}}>
          <Flex gap=".5rem">
            <Icon
              as={MdOutlineAdminPanelSettings}
              fontSize="2xl"
              alignSelf="center"
            />
            <Text fontSize={{base: "sm" , md: "lg"}}>{user?.role}</Text>
          </Flex>
          <Flex gap=".5rem">
            <Icon as={AiOutlineMail} alignSelf="center" fontSize="2xl" />
            <Text fontSize={{base: "sm" , md: "lg"}}>{user?.email}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserHeader;
