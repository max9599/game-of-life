import { fireEvent } from '@testing-library/react'

export const mockDOMRectangle: () => DOMRect = () => ({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON: () => {
    },
})

export const click = (canvas: Element, x: number, y: number) => {
    fireEvent.click(canvas, {
        clientX: x,
        clientY: y,
    })
}

export const position = (x: number, y: number, size: number) => y * size + x
