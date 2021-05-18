import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";

import App from "./components/App";
import store from './store/store'

ReactDOM.render(
  <MantineProvider theme={{ colorScheme: "dark" }}>
    <Provider store={store}>
      <App />
    </Provider>
  </MantineProvider>,
  document.getElementById("root")
);
