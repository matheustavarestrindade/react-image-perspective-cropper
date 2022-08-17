import { CSSProperties } from "react";
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
    showGrid?: boolean;
}
declare const PerspectiveCropper: ({ src, paddingX, width, height, paddingY, backgroundColor, draggableDotStyles, draggableDotSize, handleFinishedCrop, onPointsChange, startPoints, showGrid, }: PerspectiveCropperProps) => JSX.Element;
export default PerspectiveCropper;
