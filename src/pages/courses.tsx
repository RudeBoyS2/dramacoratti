import { Flex, Accordion } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Course } from "../../types";
import AccordionSection from "../components/AccordionSection";
import Container from "../components/Container";
import MediaPlayer from "../components/MediaPlayer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../utils/API";

type Selected = {
    url: string;
    title: string;
};

const filterCoursesByTopic = (courses: Course[], topic: string) => {
    return courses.filter((course) => {
        return course.topic === topic;
    });
};

const Courses: React.FC = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [topics, setTopics] = useState<any>([]);
    const { data: session, status }: any = useSession();

    const [myCourses, setMyCourses] = useState([]);
    const [selected, setSelected] = useState<Selected>({
        url: "",
        title: "",
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }

        if (session) {
            API.getMyCoursesByUserId(session.user?.id).then((res: any) => {
                setMyCourses(res.data);

                // create a set of unique topics
                const topicsSet = new Set();
                res?.data?.forEach((course: Course) => {
                    topicsSet.add(course.topic);
                });
                setTopics(Array.from(topicsSet));
            });
        }
    }, [session]);

    return (
        <>
            <Navbar />
            <Flex w="100%" bg="#f1f2f3" overflow="hidden">
                <Sidebar open={open} setOpen={setOpen} />
                <Container open={open} setOpen={setOpen}>
                    <Flex
                        align="center"
                        w="100%"
                        maxH="100%"
                        overflow="auto"
                        gap={{ base: 12, lg: "12" }}
                        flexDirection={{ base: "column-reverse", sm: "row" }}
                        bg="#f1f2f3"
                    >
                        <Flex flexDirection="column" align="center" mx="4">
                            <Flex
                                bgColor="white"
                                gap="12"
                                minW="290px"
                                align="center"
                                zIndex="0"
                                borderRadius="lg"
                                flexDirection="column"
                            >
                                <Accordion allowToggle>
                                    {topics.map((topic: any) => {
                                        return (
                                            <>
                                                <AccordionSection
                                                    topic={topic}
                                                    courses={filterCoursesByTopic(
                                                        myCourses,
                                                        topic
                                                    )}
                                                    setSelected={setSelected}
                                                />
                                            </>
                                        );
                                    })}
                                </Accordion>
                            </Flex>
                        </Flex>
                        <Flex flexDirection="column" align="center">
                            <Flex
                                flexDir="column"
                                bg="white"
                                w={{
                                    md: "450px",
                                    lg: "600px",
                                    xl: "800px",
                                    "2xl": "1300px",
                                }}
                                h={{
                                    md: "350px",
                                    lg: "450px",
                                    xl: "500px",
                                    "2xl": "800px",
                                }}
                                borderRadius="xl"
                                mx="2"
                            >
                                <MediaPlayer
                                    url={selected.url}
                                    title={selected.title}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </Container>
            </Flex>
        </>
    );
};

export default Courses;
