import React from 'react'
import InputRange, { InputRangeProps } from 'react-input-range'

type NumericSliderProps = InputRangeProps & {
    label: string
}

const NumericSlider: React.FC<NumericSliderProps> = ({ label, ...props }) => (
    <div>
        <label>{label}</label>
        <InputRange
            {...props}/>
    </div>
)

export default NumericSlider
