import { Button, Card, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Container from "../components/Container";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import API from "../utils/API";

type Course = {
  coursePdf: any;
  createdAt: string;
  updatedAt: string;
  title: string;
  topic: string;
  url: string;
  __v?: number;
  id: string;
};

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [userPdfs, setUserPdfs] = useState<any[]>([]);

  const router = useRouter();
  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      API.getMyCoursesByUserId(session.user?.id).then((res: any) => {
        setUserCourses(res.data);
      });
    }
  }, [status]);

  useEffect(() => {
    if (userCourses.length) {
      const pdfs: any[] = []
      userCourses.forEach((course) => course.coursePdf.forEach((pdf: any) => pdfs.push(pdf.pdfTitle)));
      setUserPdfs(pdfs);
    }
  }, [userCourses]);

  return (
    <>
      <Navbar />
      <Flex w="100%" h="88%" bg="#f1f2f3">
        <Sidebar open={open} setOpen={setOpen} />
        <Container open={open} setOpen={setOpen}>
          <Flex flexDirection="column" align="center" h="100%">
            <Flex
              bgColor="secondary"
              w="100%"
              h="18%"
              minH="18%"
              align="center"
              justify="center"
              zIndex="0"
              boxShadow="lg"
            ></Flex>
            <Flex
              mt="-4.5rem"
              w="90%"
              h="17%"
              minH="17%"
              bgColor="white"
              zIndex="2"
              borderRadius="md"
              align="center"
              justify="center"
              boxShadow="lg"
            >
              <Heading
                as="h2"
                size={["lg", "xl"]}
                fontWeight="extrabold"
                color="#000"
                textAlign={{ base: "center", md: "unset" }}
              >
                Bienvenido/a {session?.user?.name}!
              </Heading>
            </Flex>
            <Flex
              my={{ base: "10", md: "20" }}
              gap="8"
              h="65%"
              w="100%"
              px={{ base: "6", md: "20" }}
              justify="center"
              flexDir={{ base: "column", md: "row" }}
            >
              <Card
                h={{ base: "150px", md: "200px" }}
                w={{ base: "200px", md: "300px" }}
                bg="white"
                p="6"
              >
                <Text fontSize="xl" fontWeight="bold">
                  Cursos Asignados
                </Text>
                <Divider mt="2" mb="4" />
                <Text fontWeight="semibold">
                  Tienes asignados:{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {userCourses.length} cursos.
                  </span>
                </Text>
                <Button
                  mt="7"
                  w="100%"
                  h="35px"
                  bg="primary"
                  color="white"
                  _hover={{ bg: "primary", opacity: "85%" }}
                  _active={{ bg: "primary", opacity: "85%" }}
                  onClick={() => router.push("/courses")}
                >
                  Ir a Cursos
                </Button>
              </Card>
              <Card
                h={{ base: "150px", md: "200px" }}
                w={{ base: "200px", md: "300px" }}
                bg="white"
                p="6"
              >
                <Text fontSize="xl" fontWeight="bold">
                  Material de lectura
                </Text>
                <Divider mt="2" mb="4" />
                <Text fontWeight="semibold">
                  Tienes asignados:{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {userPdfs.length} documentos.
                  </span>
                </Text>
                <Button
                  mt="7"
                  w="100%"
                  h="35px"
                  bg="primary"
                  color="white"
                  _hover={{ bg: "primary", opacity: "85%" }}
                  _active={{ bg: "primary", opacity: "85%" }}
                  onClick={() => router.push("/reading")}
                >
                  Ir a Material de Lectura
                </Button>
              </Card>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export async function getServerSideProps() {
    const session = await getSession();

    return {
        props: {
            session,
        },
    };
}

export default Home;
