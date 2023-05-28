import { useEffect, useRef, useState } from "react";
import { CanvasEnvironement } from "../utils/canvas/canvasUtils";
import Canvas from "../utils/canvas/Canvas";

/**
 * 
 * @returns {{ref: import("react").Ref, canvas: Canvas}}
 */
export default function useCanvas(){

    const ref = useRef()
    const [canvas, setCanvas] = useState()

    useEffect(() => {
        setCanvas(new Canvas(ref.current))
    }, [])

    return {
        ref,
        canvas
    }
}