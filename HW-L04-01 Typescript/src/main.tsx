import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./store/store";
import "./index.css";
import App from "./App";

const container = document.getElementById("root") as HTMLElement | null;

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}


