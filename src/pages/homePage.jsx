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

		this.executeCommand = this.executeCommand.bind(this);
	}

	componentDidMount() {
		this.setState({ avrSettings: this.getAvrSettings() });
	}

	async getAvrSettings() {
		let response = await axios.get(routes.SETTINGS_ROUTE)
		this.setState({ avrSettings: response.data.result })
	}

	// todo: setup debounce
	async executeCommand(command, newValue) {
		await axios.post(routes.EXECUTE_ROUTE, { command, value: newValue })
		getAvrSettings()
	}

	render() {
		return (
			<div className="container-fluid">
				<Row>
					<Col xs={{ size: 1, offset: 1 }} sm={{ size: 1, offset: 1 }} lg={{ size: 1, offset: 5 }} >
						<button className="unstyled-button">
							<PowerIcon />
						</button>

						<Slider
							axis="x"
							x={state.avrSettings.masterVolume}
							onChange={({ x }) => this.executeCommand(commands.SET_VOLUME, x)}
						/>
					</Col>
				</Row>
			</div>
		)
	}
}