import React from "react";
import { useForm } from "@mantine/hooks";
import {
  TextInput,
  Button,
  Paper,
  Text,
  LoadingOverlay,
  ElementsGroup,
} from "@mantine/core";
import { usersApi } from "../api/usersApi";

function UserEditForm({ user, onSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const form = useForm({
    initialValues: { ...user },

    validationRules: {
      first_name: (value) => value.trim().length >= 2,
      last_name: (value) => value.trim().length >= 2,
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await usersApi.updateUser(values);
      onSuccess();
    } catch (error) {
      setError(null);
    }
  };

  return (
    <Paper
      padding="lg"
      shadow="sm"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        <div style={{ display: "flex", marginBottom: 15 }}>
          <TextInput
            required
            placeholder="Your first name"
            label="First name"
            style={{ marginRight: 20, flex: "0 0 calc(50% - 10px)" }}
            value={form.values.first_name}
            onChange={(event) =>
              form.setFieldValue("first_name", event.currentTarget.value)
            }
            onFocus={() => form.setFieldError("first_name", false)}
            error={
              form.errors.first_name &&
              "First name should include at least 2 characters"
            }
          />

          <TextInput
            required
            placeholder="Your last name"
            label="Last name"
            style={{ flex: "0 0 calc(50% - 10px)" }}
            value={form.values.last_name}
            onChange={(event) =>
              form.setFieldValue("last_name", event.currentTarget.value)
            }
            onFocus={() => form.setFieldError("last_name", false)}
            error={
              form.errors.last_name &&
              "Last name should include at least 2 characters"
            }
          />
        </div>

        <TextInput
          required
          placeholder="Your email"
          label="Email"
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          onFocus={() => form.setFieldError("email", false)}
          error={form.errors.email && "Field should contain a valid email"}
        />

        {error && (
          <Text color="red" size="sm" style={{ marginTop: 10 }}>
            {error}
          </Text>
        )}

        <ElementsGroup position="apart" style={{ marginTop: 25 }}>
          <Button color="blue" type="submit">
            Update
          </Button>
        </ElementsGroup>
      </form>
    </Paper>
  );
}

export default UserEditForm;
