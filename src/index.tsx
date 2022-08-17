import React from "react";
import ReactDOM from "react-dom/client";
import PerspectiveCropper, { Point } from "./PerspectiveCropper";

export { PerspectiveCropper };
export type { Point };

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <PerspectiveCropper src={"teste2.jpg"} />
    </React.StrictMode>
);
