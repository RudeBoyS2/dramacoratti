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
import { Course } from "../../../types";
import { AiOutlineFolderAdd } from "react-icons/ai";

interface AssignedCoursesTableProps {
    courses: Course[];
    addCourse: (course: Course) => void;
}

const AddCoursesTable: React.FC<AssignedCoursesTableProps> = ({
    courses,
    addCourse,
}) => {
  return (
      <TableContainer w="100%" py="1rem" overflowY="auto">
        <Table variant="simple">
          <Thead bg="secondary">
            <Tr>
              <Th w="40%" fontSize={{base: "sm", md: "lg"}} color="#fff">Titulo</Th>
              <Th w="30%" fontSize={{base: "sm", md: "lg"}} color="#fff">Descripción</Th>
              <Th w="30%" fontSize={{base: "sm", md: "lg"}} color="#fff">Añadir</Th>
            </Tr>
          </Thead>
          <Tbody>
          {courses?.map((course) => {
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
                      key={course?._id}
                  >
                    <Td w="40%">
                      <Text fontSize={{base: "sm", md: "lg"}} textTransform="capitalize">{course?.title}</Text>
                    </Td>
                    <Td w="30%">
                      <Text fontSize={{base: "sm", md: "lg"}} textTransform="capitalize">{course?.topic}</Text>
                    </Td>
                    <Td as={Flex} w="30%">
                      <Icon
                        as={AiOutlineFolderAdd}
                        fontSize="2xl"
                        onClick={() => {
                          addCourse(course);
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

export default AddCoursesTable;
