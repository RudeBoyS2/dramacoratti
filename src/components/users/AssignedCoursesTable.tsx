import {
  Flex,
  Icon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { Course } from "../../../types";

interface AssignedCoursesTableProps {
  myCourses: Course[];
  deleteCourse: (course: Course) => void;
}

const AssignedCoursesTable: React.FC<AssignedCoursesTableProps> = ({
  myCourses,
  deleteCourse,
}) => {
  return (
    <TableContainer w="100%" py="1rem" overflowY="auto">
      <Table variant="simple">
        <Thead bg="secondary">
          <Tr>
            <Th w="40%" fontSize={{ base: "sm", md: "lg" }} color="#fff">
              Título
            </Th>
            <Th w="30%" fontSize={{ base: "sm", md: "lg" }} color="#fff">
              Descripción
            </Th>
            <Th w="30%" fontSize={{ base: "sm", md: "lg" }} color="#fff">
              Quitar
            </Th>
          </Tr>
        </Thead>
        <Tbody w="100%" minW="100%">
          {myCourses?.map((course) => {
            return (
              <>
                <Tr
                  position="relative"
                  _after={{
                    content: '""',
                    position: "absolute",
                    h: "1px",
                    minW: "100%",
                    left: "0%",
                    top: "100%",
                    bg: "#cccccc",
                  }}
                  w="100%"
                  minW="100%"
                  key={course?._id}
                >
                  <Td w="40%">
                    <Text
                      fontSize={{ base: "sm", md: "lg" }}
                      textTransform="capitalize"
                    >
                      {course?.title}
                    </Text>
                  </Td>
                  <Td w="30%">
                    <Text
                      fontSize={{ base: "sm", md: "lg" }}
                      textTransform="capitalize"
                    >
                      {course?.topic}
                    </Text>
                  </Td>
                  <Td as={Flex} w="30%">
                    <Icon
                      as={BsTrash}
                      fontSize="2xl"
                      onClick={() => {
                        deleteCourse(course);
                      }}
                    />
                  </Td>
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AssignedCoursesTable;
