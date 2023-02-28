import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "app/store";
import { PersistGate } from "redux-persist/integration/react";

test("renders mini chat text", () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
  const linkElement = screen.getByText(/Mini Chat/i);
  expect(linkElement).toBeInTheDocument();
});
