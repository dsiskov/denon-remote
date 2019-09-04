
import React, { useState } from "react"
import Slider from 'react-input-slider';

// todo
//const searchDebounceTimeInMs = 500;

export default function CustomSlider(props) {
	const sliderValue = props.value
	//const [state, setState] = useState({ value: sliderValue });
	const [state, setState] = useState({ x: sliderValue });

	// function valueChanged() {

	// 	// todo: implement delay

	// 	setState();
	// }

	return (
		<div>
			({state.x})
			{/* <Slider x={state.value} onChange={setState} /> */}
			<Slider
				axis="x"
				x={state.x}
				onChange={({ x }) => setState(state => ({ ...state, x }))}
			/>
		</div>
	);
}