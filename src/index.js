import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider } from "@mantine/core";
import App from "./components/App";

ReactDOM.render(
  <MantineProvider theme={{ colorScheme: "dark" }}>
    <App />
  </MantineProvider>,
  document.getElementById("root")
);
