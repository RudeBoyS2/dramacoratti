import { Flex } from "@chakra-ui/react";
import React, { ReactElement } from "react";

type Props = {
    children: ReactElement;
    open: boolean;
    style?: React.CSSProperties;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Container: React.FC<Props> = ({ open, setOpen, children, style }) => {
    return (
        <>
            <Flex
                w="100vw"
                ml={open ? "15rem" : "4.5rem"}
                transition="all .5s ease"
                flexDir='column'
                style={style}
            >
                {children}
            </Flex>
        </>
    );
};

export default Container;
