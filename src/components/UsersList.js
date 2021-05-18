import {
  Title,
  Table,
  Image,
  Button,
  Modal,
  LoadingOverlay,
  Alert,
  Text,
} from "@mantine/core";
import React from "react";
import { usersApi } from "../api/usersApi";
import UserEditForm from "./UserEditForm";

function UsersList() {
  const [data = [], setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState();
  const [editModalOpened, setEditModalOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await usersApi.getUsers();
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [setData]);

  const rows = data.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>
        <Image src={user.avatar} height={50} width={50} />
      </td>
      <td>
        <Button
          onClick={() => {
            setEditModalOpened(true);
            setSelectedUser(user);
          }}
        >
          Edit
        </Button>
      </td>
    </tr>
  ));

  if (error)
    return (
      <Alert
        color="red"
        title="Something went wrong"
        style={{ width: "50%", margin: "auto", marginTop: 40 }}
      >
        Application crashed, try refreshing the page, if it does not help please
        contact our support
        <br />
        <br />
        Error message:
        <Text color="red" size="sm">
          undefined is not a function
        </Text>
      </Alert>
    );

  return (
    <>
      <Title style={{ marginBottom: "60px" }}>Users</Title>
      <Table>
        <LoadingOverlay visible={loading} />
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Avatar</th>
            <th></th>
          </tr>
        </thead>
        {<tbody>{rows}</tbody>}
      </Table>
      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title="Update Details"
      >
        <UserEditForm
          onSuccess={() => setEditModalOpened(false)}
          user={selectedUser}
        />
      </Modal>
    </>
  );
}

export default UsersList;
