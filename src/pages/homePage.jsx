import React, { Component } from "react"
import { Row, Col } from 'reactstrap'
import axios from 'axios'

import Slider from 'react-input-slider';
import * as routes from '../utils/routes'
import * as commands from '../utils/commands'

// icons
import { ReactComponent as PowerIcon } from '../assets/icons/power.svg'

import "./homePage.css";

export default class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			avrSettings: {
				masterVolume: 25,
				power: 'STANDBY',
				mute: false
			}
		}
	}

	componentDidMount() {
		this.setState({ avrSettings: this.getAvrSettings() });
	}

	togglePower = () => {
		const commandParameter = this.state.avrSettings.power === 'STANDBY' ? 'ON' : 'OFF';
		console.log(commandParameter);
		this.executeCommand(commands.TOGGLE_POWER, commandParameter)
	}

	// todo: setup debounce
	setVolume = (newVolume) => {
		// commands.SET_VOLUME
	}

	async getAvrSettings() {
		let response = await axios.get(routes.SETTINGS_ROUTE)
		this.setState({ avrSettings: response.data.result })
	}


	async executeCommand(command, commandParameter) {
		await axios.post(routes.EXECUTE_ROUTE, { command, commandParameter })
		this.getAvrSettings()
	}

	render() {
		return (
			<div className="container-fluid">
				<Row>
					<Col xs={{ size: 1, offset: 1 }} sm={{ size: 1, offset: 1 }} lg={{ size: 1, offset: 5 }} >
						<button className="unstyled-button" onClick={this.togglePower}>
							<PowerIcon />
						</button>

						<Slider
							axis="x"
							x={this.state.avrSettings.masterVolume}
							onChange={({ x }) => this.setVolume(x)}
						/>
					</Col>
				</Row>
			</div>
		)
	}
}