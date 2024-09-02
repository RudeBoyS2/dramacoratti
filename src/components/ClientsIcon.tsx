import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
    icon: any;
    text: string;
    number: string;
};

const ClientsIcon: React.FC<Props> = ({ icon, text, number }) => {
    return (
        <>
            <VStack>
                <Flex w='70px' h='70px' bg='#fff' justifyContent='center' alignItems='center' rounded='50%'>
                    <Icon
                        as={icon}
                        fill='#9F4D5E'
                        fontSize={["3xl", "3xl", "3xl", "5xl", "5xl"]}
                    />
                </Flex>
                <Text color='#fff'>{number}</Text>
                <Text color='#fff' fontSize={["sm", "sm", "md", "md", "md"]}>{text}</Text>
            </VStack>
        </>
    );
};

export default ClientsIcon;
