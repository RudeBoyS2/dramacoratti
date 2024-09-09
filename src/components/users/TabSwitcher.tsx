import { Button, Flex } from '@chakra-ui/react';
import React from 'react'

interface TabSwitcherProps {
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<"assignedCourses" | "addCourses">>;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
    tab,
    setTab
}) => {
  return (
    <Flex h={{base: "45px", md: "50px"}} w="100%" pl="5" gap="2" my="4" alignItems="center">
              <Button
                h="45px"
                fontSize={{base: "sm", md: "md"}}
                fontFamily="primary"
                color="white"
                bg={tab === "assignedCourses" ? "primary" : "rgba(0,63,80,.75)"}
                _hover={{ bg: "" }}
                _active={{ bg: "" }}
                borderRadius="2xl"
                onClick={() => {
                  if (tab !== "assignedCourses") setTab("assignedCourses");
                }}
              >
                Cursos Asignados
              </Button>
              <Button
                h="45px"
                fontSize={{base: "sm", md: "md"}}
                fontFamily="primary"
                color="white"
                bg={tab === "addCourses" ? "primary" : "rgba(0,63,80,.75)"}
                _hover={{ bg: "" }}
                _active={{ bg: "" }}
                borderRadius="2xl"
                onClick={() => {
                  if (tab !== "addCourses") setTab("addCourses");
                }}
              >
                Agregar Cursos
              </Button>
            </Flex>
  )
}

export default TabSwitcher