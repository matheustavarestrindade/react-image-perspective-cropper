import React from "react";
import ReactDOM from "react-dom/client";
import PerspectiveCropper from "./PerspectiveCropper";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <PerspectiveCropper src={"teste2.jpg"} />
    </React.StrictMode>
);
