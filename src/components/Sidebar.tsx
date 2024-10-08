import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHome, AiOutlineFilePdf } from "react-icons/ai";
import SidebarLink from "./SidebarLink";
import { BsBook } from "react-icons/bs";
import { RiAdminLine, RiLogoutBoxLine } from "react-icons/ri";
import { HiBars3 } from "react-icons/hi2";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sidebar: React.FC<Props> = ({ open, setOpen }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      <Flex
        w={open ? "15rem" : "4.5rem"}
        h="100%"
        bg="primary"
        flexDir="column"
        py="2rem"
        gap="2rem"
        position="fixed"
        transition="all 0.5s ease"
        zIndex="3"
      >
        <Flex
          pl={open ? "0.6rem" : "1rem"}
          mb="1rem"
          left={open ? "70%" : "0"}
          transition="all .5s ease"
          position="relative"
        >
          <Icon
            cursor="pointer"
            as={HiBars3}
            fill="#dedede"
            fontSize="3xl"
            onClick={() => setOpen(!open)}
            transform={open ? "rotate(90deg)" : "rotate(0)"}
            transition="all .2s ease"
          />
        </Flex>
        <SidebarLink
          icon={AiOutlineHome}
          path="/"
          text="Inicio"
          display={open}
        />
        <SidebarLink
          icon={BsBook}
          path="/courses"
          text="Cursos"
          display={open}
        />
        <SidebarLink
          icon={AiOutlineFilePdf}
          path="/reading"
          text="Lectura"
          display={open}
        />
        {session?.user?.email === "admin@admin.com" && (
          <SidebarLink
            icon={RiAdminLine}
            path="/backoffice"
            text="Administrar"
            display={open}
          />
        )}

        <Flex
          justifyContent="start"
          gap="1rem"
          pl="1.4rem"
          onClick={() => {
            signOut();
            router.push("/login");
          }}
          cursor="pointer"
          mt="5rem"
        >
          <Icon
            as={RiLogoutBoxLine}
            alignSelf="center"
            fontSize="3xl"
            fill="#f1f2f3"
          />
          <Text
            fontFamily="secondary"
            alignSelf="center"
            display={open ? "block" : "none"}
            fontSize="md"
            color="#f1f2f3"
          >
            Salir
          </Text>
        </Flex>
        {/*  <SidebarLink
                    icon={RiLogoutBoxLine}
                    path="/"
                    text="Salir"
                    display={open}
                    onClick={() => signOut()}
                /> */}
        {/* <Flex>
                <Icon as={AiOutlineHome} fill="#f1f2f3" fontSize="2xl" onClick={() => signOut()}/>
                
                </Flex> */}
      </Flex>
    </>
  );
};

export default Sidebar;
