import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { store } from "./redux/store";
import { router } from "./app/router";

// Main application component
export default function App() {
  return (

       // Provide Redux store access to all components
    <Provider store={store}>
      <RouterProvider router={router} />
       <Toaster position="bottom-right" richColors closeButton />
    </Provider>
  );
}