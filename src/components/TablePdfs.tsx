import {
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { ImNewTab } from "react-icons/im";
import { Course, Pdf } from "../../types";
import AddButton from "./AddButton";
import API from "../utils/API";
import ModalPdfs from "./ModalPdfs";

type Props = {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  pdfs: Pdf[];
  setPdfs: React.Dispatch<React.SetStateAction<Pdf[]>>;
};

const TableCourses: React.FC<Props> = ({
  courses,
  setCourses,
  pdfs,
  setPdfs,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onDelete = (
    courseId: string | undefined,
    pdfId: string | undefined
  ) => {
    API.deletePdfFromCourse(courseId, pdfId)
      .then((res: any) => {
        setPdfs(pdfs.filter((pdf) => pdf._id !== pdfId));
        toast({
          title: res.data.message,
          status: "success",
          duration: 3000,
        });
      })
      .catch((err) => {
        toast({
          title: "Error al eliminar el PDF",
          status: "error",
          duration: 3000,
        });
      });
  };

  return (
    <>
      <ModalPdfs
        isOpen={isOpen}
        onClose={onClose}
        setCourses={setCourses}
        courses={courses}
        setPdfs={setPdfs}
        pdfs={pdfs}
      />
      <AddButton onOpen={onOpen} title="Agregar PDF" />
      <TableContainer w="100%" overflow="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th w="33.3%">Titulo</Th>
              <Th w="33.3%">Del curso</Th>
              <Th w="33.3%">Borrar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pdfs?.map((pdf, key) => {
              const courseOfPdf = courses.find((course) =>
                course.coursePdf?.find((p) => p.pdfTitle === pdf.pdfTitle)
              );
              const courseOfPdfTitle = courseOfPdf?.title;
              const courseOfPdfId = courseOfPdf?._id;

              return (
                <Tr
                  key={key}
                  position="relative"
                  _after={{
                    content: '""',
                    position: "absolute",
                    h: "1px",
                    w: "100%",
                    left: "0%",
                    top: "100%",
                    bg: "#cccccc",
                  }}
                >
                  <>
                    <Td w="33.3%">{pdf?.pdfTitle}</Td>
                    <Td w="33.3%">{courseOfPdfTitle}</Td>
                    <Td w="33.3%">
                      <Icon
                        as={BsTrash}
                        fontSize="2xl"
                        cursor="pointer"
                        _hover={{ color: "#cf962d" }}
                        onClick={() => onDelete(courseOfPdfId, pdf?._id)}
                      />
                    </Td>
                  </>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableCourses;
