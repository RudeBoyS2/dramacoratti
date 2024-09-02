import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Course, User } from "../../../types";
import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import API from "../../utils/API";
import UserHeader from "../../components/users/UserHeader";
import TabSwitcher from "../../components/users/TabSwitcher";
import AssignedCoursesTable from "../../components/users/AssignedCoursesTable";
import AddCoursesTable from "../../components/users/AddCoursesTable";
const UserProfile: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [tab, setTab] = useState<"assignedCourses" | "addCourses">(
    "assignedCourses"
  );
  const { pid } = router.query;
  const [open, setOpen] = useState(false);
  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  useEffect(() => {
    if (myCourses.length === 0 && courses.length >= 1) {
      setTab("addCourses");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myCourses]);	

  const toast = useToast();
  const theme: any = useTheme();
  useEffect(() => {
    if (pid !== undefined) {
      API.getUserById(pid).then((res: any) => {
        setUser(res.data);
      });
      API.getCourses().then((res: any) => {
        let courses = res.data;
        // compare courses with myCourses and filter courses that are not in myCourses array and set it to courses array
        API.getMyCoursesByUserId(pid).then((res: any) => {
          setMyCourses(res.data);
          courses = courses.filter((course: Course) => {
            let found = false;
            res.data.forEach((myCourse: Course) => {
              if (course._id === myCourse._id) {
                found = true;
              }
            });
            return !found;
          });
          setCourses(courses);
        });
      });
    }
  }, [pid]);

  // add course to myCourses array and remove from courses array
  const addCourse = (course: Course) => {
    API.addCourseToUser(pid, course._id).then((res: any) => {
      if (res.status === 200) {
        toast({
          title: "Curso agregado",
          description: "El curso se ha agregado correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setMyCourses([...myCourses, course]);
        setCourses(courses.filter((c) => c._id !== course._id));
      }
    });
  };
  // delete course from myCourses array and add to courses array
  const deleteCourse = (course: Course) => {
    API.deleteCourseFromUser(pid, course._id).then((res: any) => {
      if (res.status === 200) {
        toast({
          title: "Curso eliminado",
          description: "El curso se ha eliminado correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setCourses([...courses, course]);
        setMyCourses(myCourses.filter((c) => c._id !== course._id));
      }
    });
  };

  return (
    <>
      <Navbar />
      <Sidebar open={open} setOpen={setOpen} />
      <Flex w="100%" h="88%" fontFamily="secondary">
        <Container open={open} setOpen={setOpen}>
          <>
            <Flex flexDir="column" w="100%" alignItems="center">
              <UserHeader user={user} />
            </Flex>
            <TabSwitcher tab={tab} setTab={setTab} />
            {tab === "assignedCourses" ? <AssignedCoursesTable myCourses={myCourses} deleteCourse={deleteCourse} /> : <AddCoursesTable courses={courses} addCourse={addCourse} />}
          </>
        </Container>
      </Flex>
    </>
  );
};

export default UserProfile;
