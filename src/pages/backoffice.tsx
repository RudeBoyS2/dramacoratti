import { Flex } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd, AiOutlineFilePdf } from "react-icons/ai";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TableUser from "../components/TableUsers";
import BackofficeItem from "../components/BackofficeItem";
import { FaChalkboardTeacher } from "react-icons/fa";
import TableCourses from "../components/TableCourses";
import { User, Course, Topic, Pdf } from "../../types";
import API from "../utils/API";
import { useRouter } from "next/router";
import TableTopics from "../components/TableTopics";
import TablePdfs from "../components/TablePdfs";

const Backoffice: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Usuarios");
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [pdfs, setPDFs] = useState<Pdf[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    API.getUsers().then((res: any) => {
      setUsers(res?.data);
    });

    API.getCourses().then((res: any) => {
      setCourses(res?.data);

      const coursesWithPdf = res?.data?.filter(
        (course: Course) => course?.coursePdf?.length
      );
      const pdfs: Pdf[] = coursesWithPdf?.map((course: Course) => course.coursePdf).flat();
      
      setPDFs(pdfs);
    });

    API.getTopics().then((res: any) => {
      setTopics(res?.data);
    });

  }, []);

  const router = useRouter();

  return (
    <>
      <Navbar />
      <Flex w="100%" h="88%">
        <Sidebar open={open} setOpen={setOpen} />
        <Container open={open} setOpen={setOpen}>
          <Flex flexDir="column" h="100%">
            <Flex w="100%" py="2rem" gap="3rem" px="5">
              <BackofficeItem
                icon={AiOutlineUsergroupAdd}
                text="Usuarios"
                setCategory={setCategory}
                category={category}
              />
              <BackofficeItem
                icon={FaChalkboardTeacher}
                text="Cursos"
                setCategory={setCategory}
                category={category}
              />
              <BackofficeItem
                icon={FaChalkboardTeacher}
                text="Temas"
                setCategory={setCategory}
                category={category}
              />
              <BackofficeItem
                icon={AiOutlineFilePdf}
                text="PDFs"
                setCategory={setCategory}
                category={category}
              />
            </Flex>
            {category === "Usuarios" && (
              <TableUser users={users} setUsers={setUsers} />
            )}
            {category === "Cursos" && (
              <TableCourses courses={courses} setCourses={setCourses} />
            )}
            {category === "Temas" && (
              <TableTopics topics={topics} setTopics={setTopics} />
            )}
            {category === "PDFs" && (
              <TablePdfs
                courses={courses}
                setCourses={setCourses}
                setPdfs={setPDFs}
                pdfs={pdfs}
              />
            )}
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

    return {
      props: {
        session,
      },
    };
}

export default Backoffice;
