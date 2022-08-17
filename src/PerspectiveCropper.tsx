import interact from "interactjs";
import { CSSProperties, forwardRef, useCallback, useEffect, useRef, useState } from "react";

export interface Point {
    x: number;
    y: number;
}

interface PerspectiveCropperProps {
    src: string;
    width?: number;
    height?: number;
    paddingX?: number;
    paddingY?: number;
    backgroundColor?: string;
    draggableDotStyles?: CSSProperties;
    draggableDotSize?: number;
    startPoints?: Point[];
    handleFinishedCrop?: (data: ImageData) => void;
    onPointsChange?: (points: Point[]) => void;
    onPointsFinishedChange?: (points: Point[]) => void;
    showGrid?: boolean;
}

const PerspectiveCropper = ({
    src,
    paddingX = 100,
    width,
    height,
    paddingY = 100,
    backgroundColor = "#202020",
    draggableDotStyles,
    draggableDotSize = 12,
    handleFinishedCrop,
    onPointsChange,
    onPointsFinishedChange,
    startPoints,
    showGrid = true,
}: PerspectiveCropperProps) => {
    const firstDotRef = useRef<HTMLDivElement>(null);
    const secondDotRef = useRef<HTMLDivElement>(null);
    const thirdDotRef = useRef<HTMLDivElement>(null);
    const fourthDotRef = useRef<HTMLDivElement>(null);
    const polygonRef = useRef<SVGPolygonElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const insetPx = 10;
    const dotSizeOffsset = draggableDotSize / 2;

    const [computedWidth, setWidth] = useState(width || 0);
    const [computedHeight, setHeight] = useState(height || 0);

    const [currentPoints, setCurrentPoints] = useState([]);

    const startPosx1 = startPoints && startPoints[0] ? startPoints[0].x : insetPx + dotSizeOffsset;
    const startPosy1 = startPoints && startPoints[0] ? startPoints[0].y : insetPx + dotSizeOffsset;
    const startPosx2 = startPoints && startPoints[1] ? startPoints[1].x : computedWidth - insetPx - dotSizeOffsset;
    const startPosy2 = startPoints && startPoints[1] ? startPoints[1].y : insetPx + dotSizeOffsset;
    const startPosx3 = startPoints && startPoints[2] ? startPoints[2].x : computedWidth - insetPx - dotSizeOffsset;
    const startPosy3 = startPoints && startPoints[2] ? startPoints[2].y : computedHeight - insetPx - dotSizeOffsset;
    const startPosx4 = startPoints && startPoints[3] ? startPoints[3].x : insetPx + dotSizeOffsset;
    const startPosy4 = startPoints && startPoints[3] ? startPoints[3].y : computedHeight - insetPx - dotSizeOffsset;

    const getPoints = useCallback(() => {
        const fdot = firstDotRef.current;
        const sdot = secondDotRef.current;
        const tdot = thirdDotRef.current;
        const frdot = fourthDotRef.current;

        const x1 = parseInt(fdot?.style.left.replace("px", "") || "0") + parseInt(fdot?.getAttribute("data-x") || "0") + dotSizeOffsset;
        const y1 = parseInt(fdot?.style.top.replace("px", "") || "0") + parseInt(fdot?.getAttribute("data-y") || "0") + dotSizeOffsset;
        const x2 = parseInt(sdot?.style.left.replace("px", "") || "0") + parseInt(sdot?.getAttribute("data-x") || "0") + dotSizeOffsset;
        const y2 = parseInt(sdot?.style.top.replace("px", "") || "0") + parseInt(sdot?.getAttribute("data-y") || "0") + dotSizeOffsset;
        const x3 = parseInt(tdot?.style.left.replace("px", "") || "0") + parseInt(tdot?.getAttribute("data-x") || "0") + dotSizeOffsset;
        const y3 = parseInt(tdot?.style.top.replace("px", "") || "0") + parseInt(tdot?.getAttribute("data-y") || "0") + dotSizeOffsset;
        const x4 = parseInt(frdot?.style.left.replace("px", "") || "0") + parseInt(frdot?.getAttribute("data-x") || "0") + dotSizeOffsset;
        const y4 = parseInt(frdot?.style.top.replace("px", "") || "0") + parseInt(frdot?.getAttribute("data-y") || "0") + dotSizeOffsset;

        const maxX = Math.max(x1, x2, x3, x4);
        const maxY = Math.max(y1, y2, y3, y4);
        const minX = Math.min(x1, x2, x3, x4);
        const minY = Math.min(y1, y2, y3, y4);
        const width = maxX - minX;
        const height = maxY - minY;

        return { x1, y1, x2, y2, x3, y3, x4, y4, width, height };
    }, [dotSizeOffsset]);

    const drawSVG = useCallback(() => {
        if (!polygonRef.current) return;
        const { x1, y1, x2, y2, x3, y3, x4, y4 } = getPoints();

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
        const polygon = polygonRef.current;
        polygon.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`);
    }, [getPoints, onPointsChange, onPointsFinishedChange]);

    const dragMoveListener = useCallback(
        (event: any) => {
            const target = event.target as HTMLDivElement;

            const x = parseFloat(target.getAttribute("data-x") || "0") + event.dx;
            const y = parseFloat(target.getAttribute("data-y") || "0") + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;

            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
            drawSVG();
        },
        [drawSVG]
    );

    useEffect(() => {
        if (!firstDotRef.current || !secondDotRef.current || !thirdDotRef.current || !fourthDotRef.current) return;
        firstDotRef.current.style.top = startPosy1 + "px";
        firstDotRef.current.style.left = startPosx1 + "px";
        secondDotRef.current.style.top = startPosy2 + "px";
        secondDotRef.current.style.left = startPosx2 + "px";
        thirdDotRef.current.style.top = startPosy3 + "px";
        thirdDotRef.current.style.left = startPosx3 + "px";
        fourthDotRef.current.style.top = startPosy4 + "px";
        fourthDotRef.current.style.left = startPosx4 + "px";

        const interactListener = interact(".draggable").draggable({
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: "parent",
                    endOnly: true,
                }),
            ],
            onmove: dragMoveListener,
            listeners: {
                move(event) {
                    /* console.log(event.pageX,
                            event.pageY) */
                },
            },
        });

        return () => interactListener.unset();
    }, [computedWidth, computedHeight, paddingX, paddingY, dragMoveListener, startPosy1, startPosx1, startPosy2, startPosx2, startPosy3, startPosx3, startPosy4, startPosx4]);

    const svgDefaultStyles: CSSProperties = {
        zIndex: 1,
        position: "absolute",
    };

    const SVGPolygonElement: CSSProperties = {
        stroke: "white",
        strokeWidth: 2,
    };

    const containerStyles: CSSProperties = {
        display: "flex",
        position: "relative",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor,
        width: computedWidth + paddingX + "px",
        height: computedHeight + paddingY,
        alignItems: "center",
    };

    const subContainerStyles: CSSProperties = {
        display: "flex",
        position: "relative",
        alignContent: "center",
        justifyContent: "center",
        width: computedWidth + "px",
        height: computedHeight,
        alignItems: "center",
    };

    const buttonStyles: CSSProperties = {
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

    const loadImageOnCanvas = useCallback(async () => {
        if (!src) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let img = new Image();
        await new Promise((r, rej) => {
            img.src = src;
            img.onload = r;
            img.onerror = rej;
        });
        if (!computedHeight) setHeight(img.height);
        if (!computedWidth) setWidth(img.width);

        ctx.drawImage(img, 0, 0, computedWidth, computedHeight);
    }, [computedHeight, src, computedWidth]);

    useEffect(() => {
        if (src === null || src === "") return;
        loadImageOnCanvas();
    }, [loadImageOnCanvas, src]);

    const wrapImage = useCallback(
        (frame: any, dst: any, imagePoints: Point[], imageWidth: number, imageHeight: number) => {
            if (!cv) throw new Error("cv is not defined");
            let arr1: number[] = [];
            for (let i = 0; i < imagePoints.length; i++) {
                arr1.push(imagePoints[i].x);
                arr1.push(imagePoints[i].y);
            }
            let arr2 = [0, 0, computedWidth, 0, 0, computedHeight, computedWidth, computedHeight];
            let mat1 = cv.matFromArray(4, 2, cv.CV_32F, arr1);
            let mat2 = cv.matFromArray(4, 2, cv.CV_32F, arr2);
            let perspectiveMatrix = cv.getPerspectiveTransform(mat1, mat2);
            let size = new cv.Size(computedWidth, computedHeight);
            cv.warpPerspective(frame, dst, perspectiveMatrix, size);
            mat1.delete();
            mat2.delete();
            frame.delete();
            perspectiveMatrix.delete();
            size = new cv.Size(imageWidth, imageHeight);

            cv.resize(dst, dst, size);
            const intArray = new Uint8ClampedArray(dst.data, dst.cols, dst.rows);
            const imageData = new ImageData(intArray, dst.cols, dst.rows);
            return imageData;
        },
        [computedHeight, computedWidth]
    );

    useEffect(() => {
        if (typeof onPointsFinishedChange === "function") {
            const timeout = setTimeout(() => {
                onPointsFinishedChange(currentPoints);
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [currentPoints, onPointsFinishedChange]);

    const cropImage = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const { x1, y1, x2, y2, x3, y3, x4, y4, width: imageWidth, height: imageHeigth } = getPoints();
        const imageData = ctx.getImageData(0, 0, computedWidth, computedHeight);
        let src = cv.matFromImageData(imageData);
        let dst = new cv.Mat();
        const wrapMatrix = [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            { x: x4, y: y4 },
            { x: x3, y: y3 },
        ];
        const imageDataWrapped = wrapImage(src, dst, wrapMatrix, imageWidth, imageHeigth);
        handleFinishedCrop && handleFinishedCrop(imageDataWrapped);
    }, [getPoints, handleFinishedCrop, computedHeight, computedWidth, wrapImage]);

    return (
        <div style={containerStyles}>
            <div style={subContainerStyles}>
                <svg height={computedHeight} width={computedWidth} style={svgDefaultStyles}>
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <rect width="40" height="40" fill="rgba(20 ,20,20,0.5)" />
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="2" />
                        </pattern>
                    </defs>
                    <polygon
                        fill={`${showGrid ? "url(#grid)" : "transparent"}`}
                        ref={polygonRef}
                        id="poly"
                        style={SVGPolygonElement}
                        points={`${startPosx1},${startPosy1} ${startPosx2},${startPosy2} ${startPosx3},${startPosy3} ${startPosx4},${startPosy4}`}
                    />
                </svg>
                <DraggableDot id="FIRST" draggableDotStyles={draggableDotStyles} ref={firstDotRef} draggableDotSize={draggableDotSize} />
                <DraggableDot id="SECOND" draggableDotStyles={draggableDotStyles} ref={secondDotRef} draggableDotSize={draggableDotSize} />
                <DraggableDot id="THIRD" draggableDotStyles={draggableDotStyles} ref={thirdDotRef} draggableDotSize={draggableDotSize} />
                <DraggableDot id="FORFH" draggableDotStyles={draggableDotStyles} ref={fourthDotRef} draggableDotSize={draggableDotSize} />
                <canvas ref={canvasRef} width={computedWidth} height={computedHeight} />
                <button style={buttonStyles} onClick={cropImage}>
                    Crop Image
                </button>
            </div>
        </div>
    );
};

const DraggableDot = forwardRef<HTMLDivElement | null, { draggableDotStyles?: CSSProperties; id: string; draggableDotSize: number }>(({ draggableDotStyles, id, draggableDotSize }, ref) => {
    const defaultStyle: CSSProperties = {
        width: draggableDotSize + "px",
        height: draggableDotSize + "px",
        backgroundColor: "#14ff7e",
        borderRadius: "50%",
        position: "absolute",
        zIndex: 2,
        transform: `translate(-${draggableDotSize / 2}px, -${draggableDotSize / 2}px)`,
    };

    return (
        <div
            ref={ref}
            id={id}
            data-y={"-" + String(draggableDotSize / 2)}
            data-x={"-" + String(draggableDotSize / 2)}
            className="draggable"
            style={draggableDotStyles ? draggableDotStyles : defaultStyle}
        />
    );
});

export default PerspectiveCropper;
