"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var interactjs_1 = __importDefault(require("interactjs"));
var react_1 = require("react");
var PerspectiveCropper = function (_a) {
    var src = _a.src, _b = _a.paddingX, paddingX = _b === void 0 ? 100 : _b, width = _a.width, height = _a.height, _c = _a.paddingY, paddingY = _c === void 0 ? 100 : _c, _d = _a.backgroundColor, backgroundColor = _d === void 0 ? "#202020" : _d, draggableDotStyles = _a.draggableDotStyles, _e = _a.draggableDotSize, draggableDotSize = _e === void 0 ? 12 : _e, handleFinishedCrop = _a.handleFinishedCrop, onPointsChange = _a.onPointsChange, onPointsFinishedChange = _a.onPointsFinishedChange, startPoints = _a.startPoints, _f = _a.showGrid, showGrid = _f === void 0 ? true : _f, buttonContent = _a.buttonContent, customButtonStyles = _a.customButtonStyles;
    var firstDotRef = (0, react_1.useRef)(null);
    var secondDotRef = (0, react_1.useRef)(null);
    var thirdDotRef = (0, react_1.useRef)(null);
    var fourthDotRef = (0, react_1.useRef)(null);
    var polygonRef = (0, react_1.useRef)(null);
    var canvasRef = (0, react_1.useRef)(null);
    var insetPx = 10;
    var dotSizeOffsset = draggableDotSize / 2;
    var _g = (0, react_1.useState)(width || 0), computedWidth = _g[0], setWidth = _g[1];
    var _h = (0, react_1.useState)(height || 0), computedHeight = _h[0], setHeight = _h[1];
    var _j = (0, react_1.useState)([]), currentPoints = _j[0], setCurrentPoints = _j[1];
    var _k = (0, react_1.useState)(false), isDraggin = _k[0], setIsDraggin = _k[1];
    var startPosx1 = startPoints && startPoints[0] ? startPoints[0].x : insetPx + dotSizeOffsset;
    var startPosy1 = startPoints && startPoints[0] ? startPoints[0].y : insetPx + dotSizeOffsset;
    var startPosx2 = startPoints && startPoints[1] ? startPoints[1].x : computedWidth - insetPx - dotSizeOffsset;
    var startPosy2 = startPoints && startPoints[1] ? startPoints[1].y : insetPx + dotSizeOffsset;
    var startPosx3 = startPoints && startPoints[2] ? startPoints[2].x : computedWidth - insetPx - dotSizeOffsset;
    var startPosy3 = startPoints && startPoints[2] ? startPoints[2].y : computedHeight - insetPx - dotSizeOffsset;
    var startPosx4 = startPoints && startPoints[3] ? startPoints[3].x : insetPx + dotSizeOffsset;
    var startPosy4 = startPoints && startPoints[3] ? startPoints[3].y : computedHeight - insetPx - dotSizeOffsset;
    var getPoints = (0, react_1.useCallback)(function () {
        var fdot = firstDotRef.current;
        var sdot = secondDotRef.current;
        var tdot = thirdDotRef.current;
        var frdot = fourthDotRef.current;
        var x1 = parseInt((fdot === null || fdot === void 0 ? void 0 : fdot.style.left.replace("px", "")) || "0") + parseInt((fdot === null || fdot === void 0 ? void 0 : fdot.getAttribute("data-x")) || "0") + dotSizeOffsset;
        var y1 = parseInt((fdot === null || fdot === void 0 ? void 0 : fdot.style.top.replace("px", "")) || "0") + parseInt((fdot === null || fdot === void 0 ? void 0 : fdot.getAttribute("data-y")) || "0") + dotSizeOffsset;
        var x2 = parseInt((sdot === null || sdot === void 0 ? void 0 : sdot.style.left.replace("px", "")) || "0") + parseInt((sdot === null || sdot === void 0 ? void 0 : sdot.getAttribute("data-x")) || "0") + dotSizeOffsset;
        var y2 = parseInt((sdot === null || sdot === void 0 ? void 0 : sdot.style.top.replace("px", "")) || "0") + parseInt((sdot === null || sdot === void 0 ? void 0 : sdot.getAttribute("data-y")) || "0") + dotSizeOffsset;
        var x3 = parseInt((tdot === null || tdot === void 0 ? void 0 : tdot.style.left.replace("px", "")) || "0") + parseInt((tdot === null || tdot === void 0 ? void 0 : tdot.getAttribute("data-x")) || "0") + dotSizeOffsset;
        var y3 = parseInt((tdot === null || tdot === void 0 ? void 0 : tdot.style.top.replace("px", "")) || "0") + parseInt((tdot === null || tdot === void 0 ? void 0 : tdot.getAttribute("data-y")) || "0") + dotSizeOffsset;
        var x4 = parseInt((frdot === null || frdot === void 0 ? void 0 : frdot.style.left.replace("px", "")) || "0") + parseInt((frdot === null || frdot === void 0 ? void 0 : frdot.getAttribute("data-x")) || "0") + dotSizeOffsset;
        var y4 = parseInt((frdot === null || frdot === void 0 ? void 0 : frdot.style.top.replace("px", "")) || "0") + parseInt((frdot === null || frdot === void 0 ? void 0 : frdot.getAttribute("data-y")) || "0") + dotSizeOffsset;
        var maxX = Math.max(x1, x2, x3, x4);
        var maxY = Math.max(y1, y2, y3, y4);
        var minX = Math.min(x1, x2, x3, x4);
        var minY = Math.min(y1, y2, y3, y4);
        var width = maxX - minX;
        var height = maxY - minY;
        return { x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3, x4: x4, y4: y4, width: width, height: height };
    }, [dotSizeOffsset]);
    var drawSVG = (0, react_1.useCallback)(function () {
        if (!polygonRef.current)
            return;
        var _a = getPoints(), x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2, x3 = _a.x3, y3 = _a.y3, x4 = _a.x4, y4 = _a.y4;
        if (typeof onPointsFinishedChange === "function")
            setCurrentPoints([
                { x: x1, y: y1 },
                { x: x2, y: y2 },
                { x: x3, y: y3 },
                { x: x4, y: y4 },
            ]);
        if (typeof onPointsChange === "function")
            onPointsChange([
                { x: x1, y: y1 },
                { x: x2, y: y2 },
                { x: x3, y: y3 },
                { x: x4, y: y4 },
            ]);
        var polygon = polygonRef.current;
        polygon.setAttribute("points", "".concat(x1, ",").concat(y1, " ").concat(x2, ",").concat(y2, " ").concat(x3, ",").concat(y3, " ").concat(x4, ",").concat(y4));
    }, [getPoints, onPointsChange, onPointsFinishedChange]);
    var dragMoveListener = (0, react_1.useCallback)(function (event) {
        var target = event.target;
        var x = parseFloat(target.getAttribute("data-x") || "0") + event.dx;
        var y = parseFloat(target.getAttribute("data-y") || "0") + event.dy;
        target.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
        drawSVG();
    }, [drawSVG]);
    (0, react_1.useEffect)(function () {
        if (!firstDotRef.current || !secondDotRef.current || !thirdDotRef.current || !fourthDotRef.current)
            return;
        firstDotRef.current.style.top = startPosy1 + "px";
        firstDotRef.current.style.left = startPosx1 + "px";
        secondDotRef.current.style.top = startPosy2 + "px";
        secondDotRef.current.style.left = startPosx2 + "px";
        thirdDotRef.current.style.top = startPosy3 + "px";
        thirdDotRef.current.style.left = startPosx3 + "px";
        fourthDotRef.current.style.top = startPosy4 + "px";
        fourthDotRef.current.style.left = startPosx4 + "px";
        var interactListener = (0, interactjs_1.default)(".draggable").draggable({
            modifiers: [
                interactjs_1.default.modifiers.restrictRect({
                    restriction: "parent",
                    endOnly: true,
                }),
            ],
            onend: function () { return setIsDraggin(false); },
            onstart: function () { return setIsDraggin(true); },
            onmove: dragMoveListener,
        });
        return function () { return interactListener.unset(); };
    }, [computedWidth, computedHeight, paddingX, paddingY, dragMoveListener, startPosy1, startPosx1, startPosy2, startPosx2, startPosy3, startPosx3, startPosy4, startPosx4]);
    var svgDefaultStyles = {
        zIndex: 1,
        position: "absolute",
    };
    var SVGPolygonElement = {
        stroke: "white",
        strokeWidth: 2,
    };
    var containerStyles = {
        display: "flex",
        position: "relative",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
        width: computedWidth + paddingX + "px",
        height: computedHeight + paddingY,
        alignItems: "center",
    };
    var subContainerStyles = {
        display: "flex",
        position: "relative",
        alignContent: "center",
        justifyContent: "center",
        width: computedWidth + "px",
        height: computedHeight,
        alignItems: "center",
    };
    var buttonStyles = {
        display: "flex",
        position: "absolute",
        bottom: "50px",
        right: computedWidth / 2 + "px",
        width: "150px",
        height: "50px",
        cursor: "pointer",
        background: "none",
        border: " 2px solid rgba(255,255,255,0.4)",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        color: "white",
        transform: "translate(50%, 50%)",
        zIndex: 1,
    };
    var loadImageOnCanvas = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var canvas, ctx, img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!src)
                        return [2 /*return*/];
                    canvas = canvasRef.current;
                    if (!canvas)
                        return [2 /*return*/];
                    ctx = canvas.getContext("2d");
                    if (!ctx)
                        return [2 /*return*/];
                    img = new Image();
                    return [4 /*yield*/, new Promise(function (r, rej) {
                            img.src = src;
                            img.onload = r;
                            img.onerror = rej;
                        })];
                case 1:
                    _a.sent();
                    if (!computedHeight)
                        setHeight(img.height);
                    if (!computedWidth)
                        setWidth(img.width);
                    ctx.drawImage(img, 0, 0, computedWidth, computedHeight);
                    return [2 /*return*/];
            }
        });
    }); }, [computedHeight, src, computedWidth]);
    (0, react_1.useEffect)(function () {
        if (src === null || src === "")
            return;
        loadImageOnCanvas();
    }, [loadImageOnCanvas, src]);
    var wrapImage = (0, react_1.useCallback)(function (frame, dst, imagePoints, imageWidth, imageHeight) {
        if (!cv)
            throw new Error("cv is not defined");
        var arr1 = [];
        for (var i = 0; i < imagePoints.length; i++) {
            arr1.push(imagePoints[i].x);
            arr1.push(imagePoints[i].y);
        }
        var arr2 = [0, 0, computedWidth, 0, 0, computedHeight, computedWidth, computedHeight];
        var mat1 = cv.matFromArray(4, 2, cv.CV_32F, arr1);
        var mat2 = cv.matFromArray(4, 2, cv.CV_32F, arr2);
        var perspectiveMatrix = cv.getPerspectiveTransform(mat1, mat2);
        var size = new cv.Size(computedWidth, computedHeight);
        cv.warpPerspective(frame, dst, perspectiveMatrix, size);
        mat1.delete();
        mat2.delete();
        frame.delete();
        perspectiveMatrix.delete();
        size = new cv.Size(imageWidth, imageHeight);
        cv.resize(dst, dst, size);
        var intArray = new Uint8ClampedArray(dst.data, dst.cols, dst.rows);
        var imageData = new ImageData(intArray, dst.cols, dst.rows);
        return imageData;
    }, [computedHeight, computedWidth]);
    (0, react_1.useEffect)(function () {
        if (isDraggin) {
            return;
        }
        if (!isDraggin) {
            onPointsFinishedChange(currentPoints);
        }
    }, [currentPoints, onPointsFinishedChange, isDraggin]);
    var cropImage = (0, react_1.useCallback)(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        var _a = getPoints(), x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2, x3 = _a.x3, y3 = _a.y3, x4 = _a.x4, y4 = _a.y4, imageWidth = _a.width, imageHeigth = _a.height;
        var imageData = ctx.getImageData(0, 0, computedWidth, computedHeight);
        var src = cv.matFromImageData(imageData);
        var dst = new cv.Mat();
        var wrapMatrix = [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            { x: x4, y: y4 },
            { x: x3, y: y3 },
        ];
        var imageDataWrapped = wrapImage(src, dst, wrapMatrix, imageWidth, imageHeigth);
        handleFinishedCrop && handleFinishedCrop(imageDataWrapped);
    }, [getPoints, handleFinishedCrop, computedHeight, computedWidth, wrapImage]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: containerStyles }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ style: subContainerStyles }, { children: [(0, jsx_runtime_1.jsxs)("svg", __assign({ height: computedHeight, width: computedWidth, style: svgDefaultStyles }, { children: [(0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsxs)("pattern", __assign({ id: "grid", width: "40", height: "40", patternUnits: "userSpaceOnUse" }, { children: [(0, jsx_runtime_1.jsx)("rect", { width: "40", height: "40", fill: "rgba(20 ,20,20,0.5)" }), (0, jsx_runtime_1.jsx)("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: "white", strokeWidth: "2" })] })) }), (0, jsx_runtime_1.jsx)("polygon", { fill: "".concat(showGrid ? "url(#grid)" : "transparent"), ref: polygonRef, id: "poly", style: SVGPolygonElement, points: "".concat(startPosx1, ",").concat(startPosy1, " ").concat(startPosx2, ",").concat(startPosy2, " ").concat(startPosx3, ",").concat(startPosy3, " ").concat(startPosx4, ",").concat(startPosy4) })] })), (0, jsx_runtime_1.jsx)(DraggableDot, { id: "FIRST", draggableDotStyles: draggableDotStyles, ref: firstDotRef, draggableDotSize: draggableDotSize }), (0, jsx_runtime_1.jsx)(DraggableDot, { id: "SECOND", draggableDotStyles: draggableDotStyles, ref: secondDotRef, draggableDotSize: draggableDotSize }), (0, jsx_runtime_1.jsx)(DraggableDot, { id: "THIRD", draggableDotStyles: draggableDotStyles, ref: thirdDotRef, draggableDotSize: draggableDotSize }), (0, jsx_runtime_1.jsx)(DraggableDot, { id: "FORFH", draggableDotStyles: draggableDotStyles, ref: fourthDotRef, draggableDotSize: draggableDotSize }), (0, jsx_runtime_1.jsx)("canvas", { ref: canvasRef, width: computedWidth, height: computedHeight }), (0, jsx_runtime_1.jsxs)("button", __assign({ style: customButtonStyles || buttonStyles, onClick: cropImage }, { children: [buttonContent && buttonContent, !buttonContent && "Crop Image"] }))] })) })));
};
var DraggableDot = (0, react_1.forwardRef)(function (_a, ref) {
    var draggableDotStyles = _a.draggableDotStyles, id = _a.id, draggableDotSize = _a.draggableDotSize;
    var defaultStyle = {
        width: draggableDotSize + "px",
        height: draggableDotSize + "px",
        backgroundColor: "#14ff7e",
        borderRadius: "50%",
        position: "absolute",
        zIndex: 2,
        transform: "translate(-".concat(draggableDotSize / 2, "px, -").concat(draggableDotSize / 2, "px)"),
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, id: id, "data-y": "-" + String(draggableDotSize / 2), "data-x": "-" + String(draggableDotSize / 2), className: "draggable", style: draggableDotStyles ? draggableDotStyles : defaultStyle }));
});
exports.default = PerspectiveCropper;
