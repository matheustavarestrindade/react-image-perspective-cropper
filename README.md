# React-perspective-cropper

## Description

React-perspective-cropper is a React component for cropping images based on OpenCV andperspective transformation.

![Cropper](https://img001.prntscr.com/file/img001/8H8g_pWyTkqN2rWlp3zhSg.png)

## Installation

npm install react-image-perspective-cropper

## Requirements

- [OpenCV](https://opencv.org/)
- [React](https://reactjs.org/)
- [interactjs](https://interactjs.io/)

## Usage

```jsx
import ReactImagePerspectiveCropper from 'react-image-perspective-cropper';

const Cropper = () => {

    return <PerspectiveCropper 
        src={"teste2.jpg"}
        width={1000} // Optional, if not present will be used the image width (measured in px)
        height={1000}  // Optional, if not present will be used the image width (measured in px)
        paddingX={0} // Optional, if not present will be used 100 (measured in px)
        paddingY={0} // Optional, if not present will be used 100 (measured in px)
        backgroundColor={"#202020"} // Optional, if not present will be used #202020
        draggableDotStyles={undefined} // Optional, if not present will be used the default styles
        draggableDotSize={10} // Optional, if not present will be used 10 (measured in px)
        handleFinishedCrop={(croppedImage) => {
                console.log(croppedImage); // Cropped imageData
        }}
        showGrid={true} // Optional, if not present will be used true
    />

}

export default Cropper;
```
