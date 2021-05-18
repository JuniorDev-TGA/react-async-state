import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import App from "./components/App";

const client = new QueryClient();

ReactDOM.render(
  <MantineProvider theme={{ colorScheme: "dark" }}>
    <QueryClientProvider client={client}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </MantineProvider>,
  document.getElementById("root")
);
