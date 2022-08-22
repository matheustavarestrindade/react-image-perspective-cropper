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
    onPointsFinishedChange?: (points: Point[]) => void;
    showGrid?: boolean;
    buttonContent?: React.ReactNode | string | number | null;
    customButtonStyles?: CSSProperties;
}
declare const PerspectiveCropper: ({ src, paddingX, width, height, paddingY, backgroundColor, draggableDotStyles, draggableDotSize, handleFinishedCrop, onPointsChange, onPointsFinishedChange, startPoints, showGrid, buttonContent, customButtonStyles, }: PerspectiveCropperProps) => JSX.Element;
export default PerspectiveCropper;
