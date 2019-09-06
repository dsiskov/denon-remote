import React, { Component } from "react"
import { Row, Col, Container } from 'reactstrap'
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
		const icons = [
			<PowerIcon />, <PowerIcon />, <PowerIcon />, <PowerIcon />, <PowerIcon />
		]
		return (
			<div className="container-fluid">

				<Container style={{
					display: "flex", flexDirection: "column",
					minHeight: "99vh"
				}}>
					{/* top row */}
					<Row>
						<Col xs={{ size: 1, offset: 11 }} style={{ marginTop: "10px" }}>
							<button className="unstyled-button" onClick={this.togglePower}>
								<PowerIcon />
							</button>
						</Col>
					</Row>

					<Row>
						<Col xs={{ size: 3 }} sm={{ size: 3 }}>
							{icons.map(x => x)}
						</Col>

					</Row>

					<div style={{ marginTop: "auto" }}>
						<Row class="wrapper">
							<Col xs={{ size: 12 }} style={{ marginTop: "10px", }}>
								<Slider
									style={{ width: "100%" }}
									axis="x"
									x={this.state.avrSettings.masterVolume}
									onChange={({ x }) => this.setVolume(x)}
								/>
							</Col>
						</Row>
					</div>
				</Container>

			</div>
		)
	}
}