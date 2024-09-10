import { Flex } from "@chakra-ui/react";
import React, { ReactElement } from "react";

type Props = {
    children: ReactElement;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Container: React.FC<Props> = ({ open, setOpen, children }) => {
    return (
        <>
            <Flex
                w="100vw"
                ml={open ? "15rem" : "4.5rem"}
                transition="all .5s ease"
                flexDir='column'
            >
                {children}
            </Flex>
        </>
    );
};

export default Container;
