import { Flex, Text } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { useSession } from "next-auth/react";
import React from "react";
import ChakraNextImage from "./ChakraNextImage";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
    const { data: session, status } = useSession();

    const theme: any = useTheme();

    const router = useRouter();

    return (
        <>
            <Flex
                w="100%"
                h="12%"
                justifyContent="center"
                px={{base: "1.5rem", md: "5rem"}}
                align="center"
                borderBottom="1px solid #e2e8f0"
                bg="#f1f2f3"
                zIndex="100"
            >
                <ChakraNextImage
                    src="/assets/logo.png"
                    alt="logo"
                    h="70px"
                    w="140px"
                    alignSelf="center"
                    onClick={() => {
                        router.push("/");
                    }}
                    cursor="pointer"
                />
                <Flex ml="auto" gap="2rem" alignSelf="center">
                    <Flex gap="1rem">
                        <Image
                            src="/profile.svg"
                            height={40}
                            width={40}
                            style={{ borderRadius: "50%" }}
                            alt="profile"
                        />
                        <Text
                            fontFamily={theme.fonts.tertiary}
                            alignSelf="center"
                            fontSize="sm"
                        >
                            {session?.user?.name}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default Navbar;
