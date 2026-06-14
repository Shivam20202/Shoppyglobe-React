import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { store } from "./redux/store";
import { router } from "./app/router";

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}