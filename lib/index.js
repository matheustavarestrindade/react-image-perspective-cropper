"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerspectiveCropper = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
var PerspectiveCropper_1 = __importDefault(require("./PerspectiveCropper"));
exports.PerspectiveCropper = PerspectiveCropper_1.default;
var root = client_1.default.createRoot(document.getElementById("root"));
root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(PerspectiveCropper_1.default, { src: "teste2.jpg" }) }));
