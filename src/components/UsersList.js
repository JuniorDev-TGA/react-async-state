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
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/selectors";
import { fetchAllUsers, selectUser } from "../store/actions";
import UserEditForm from "./UserEditForm";

function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const error = useSelector((state) => state.users.error);
  const isLoading = useSelector((state) => state.users.isLoading);
  const [editModalOpened, setEditModalOpened] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  
  const rows = users.map((user) => (
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
            dispatch(selectUser(user.id));
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
      <LoadingOverlay visible={isLoading} />
      <Table>
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
        <tbody>{rows}</tbody>
      </Table>
      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title="Update Details"
      >
        <UserEditForm onSuccess={() => setEditModalOpened(false)} />
      </Modal>
    </>
  );
}

export default UsersList;
