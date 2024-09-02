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
import Image from "next/image";
import Router from "next/router";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { ImNewTab } from "react-icons/im";
import { User } from "../../types";
import API from "../utils/API";
import AddButton from "./AddButton";
import ModalUser from "./ModalUser";

type Props = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const TableUser: React.FC<Props> = ({ users, setUsers }) => {
  const theme: any = useTheme();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = (id: string) =>
    API.deleteUser(id)?.then((res) => {
      // find the index of the user with the id that was deleted and remove it from the array
      const index = users.findIndex((user) => user._id === id);
      const newUsers = [...users];
      newUsers.splice(index, 1);
      setUsers(newUsers);
      toast({
        title: "Usuario eliminado",
        status: "success",
      });
    });
  return (
    <>
      <ModalUser
        isOpen={isOpen}
        onClose={onClose}
        users={users}
        setUsers={setUsers}
      />

      <AddButton onOpen={onOpen} title="Agregar Usuario" />
      <TableContainer w="100%" overflowY="auto" pl={isOpen ? "0" : "0"}>
        <Table variant="striped">
          <Thead position="sticky" top="0" zIndex="100">
            <Tr>
              <Th w="20%" fontSize="sm" fontWeight='medium' color="black">Avatar</Th>
              <Th w="20%" fontSize="sm" fontWeight='medium' color="black">Nombre</Th>
              <Th w="20%" fontSize="sm" fontWeight='medium' color="black">Correo</Th>
              <Th w="20%" fontSize="sm" fontWeight='medium' color="black">Editar</Th>
              <Th w="20%" fontSize="sm" fontWeight='medium' color="black">Borrar</Th>
            </Tr>
          </Thead>
          <Tbody fontSize="lg">
            {users?.map((user, index) => {
              return (
                <Tr
                  key={index}
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
                    <Td w="20%">
                      <Image
                        src={"/profile.svg"}
                        alt="user avatar"
                        width={50}
                        height={50}
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                    </Td>
                    <Td w="20%">{user.name}</Td>
                    <Td w="20%">{user.email}</Td>
                    <Td w="20%">
                      <Icon
                        as={ImNewTab}
                        cursor="pointer"
                        fontSize="3xl"
                        ml="3"
                        onClick={() => {
                          Router.push(`/users/${user._id}`);
                        }}
                        _hover={{ color: "secondary" }}
                      />
                    </Td>
                    <Td w="20%">
                      {user.email !== "admin@admin.com" && (
                        <Icon
                          as={BsTrash}
                          cursor="pointer"
                          fontSize="3xl"
                          ml="4"
                          onClick={() => onDelete(user._id)}
                          _hover={{ color: "secondary" }}
                        />
                      )}
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

export default TableUser;
