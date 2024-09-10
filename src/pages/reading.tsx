import type { Course, Pdf } from "../../types";
import { Flex, Heading, Button, Icon, Link } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../utils/API";
import PdfCard from "../components/PdfCard";

const Courses: React.FC<{ session: any }> = ({ session }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [pdfs, setPdfs] = useState<(Pdf | undefined)[]>([]);

  useEffect(() => {
    if (session) {
      API.getMyCoursesByUserId(session.user.id).then((res: any) => {
        const filteredData: Course[] = res?.data?.filter(
          (course: Course) => course.coursePdf!.length > 0
        );
        setCourses(filteredData);

        const pdfs: (Pdf | undefined)[] = filteredData.map((course: Course): any => course.coursePdf)
          .flat();

        setPdfs(pdfs);
      });
    }
  }, [session]);

  return (
    <>
      <Navbar />
      <Flex w="100%" h="88%" bg="#f1f2f3" overflow="hidden">
        <Sidebar open={open} setOpen={setOpen} />
        <Container open={open} setOpen={setOpen}>
          <Flex
            bg="bg"
            w="100%"
            h="100%"
            justify="center"
            align="center"
            py="6"
            overflowY={{ base: "scroll", md: "hidden" }}
          >
            {pdfs?.length === 0 ? (
              <Heading as="h1">No tienes material de lectura asignado</Heading>
            ) : (
              <Flex
                flexDir={{ base: "column", md: "row" }}
                gap="4"
                w="90%"
                h="100%"
                justify={{base: "start", md:"center"}}
                align="center"
                flexWrap={{ base: "nowrap", md: "wrap" }}
              >
                {pdfs?.map((pdf) => (
                  <PdfCard pdf={pdf} key={pdf?._id} />
                ))}
              </Flex>
            )}
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default Courses;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session !== null) {
    return {
      props: {
        session,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
