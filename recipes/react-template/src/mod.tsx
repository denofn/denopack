import "./index.css";

import App from "./App.tsx";
import { React, ReactDOM } from "./deps.ts";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // deno-lint-ignore no-undef
  document.getElementById("root"),
);
