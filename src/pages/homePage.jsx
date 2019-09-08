import React, { Component } from "react"
import { Row, Col, Container } from 'reactstrap'
import axios from 'axios'

import Slider from 'react-input-slider';
import * as routes from '../utils/routes'
import * as commands from '../utils/commands'
import * as inputTypes from '../utils/inputs'
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
		console.log('power')
		const commandParameter = this.state.avrSettings.power === 'STANDBY' ? 'ON' : 'OFF';
		console.log(commandParameter);
		this.executeCommand(commands.TOGGLE_POWER, commandParameter)
	}

	// todo: setup debounce
	setVolume = (newVolume) => {
		console.log(newVolume)
		// commands.SET_VOLUME
	}

	async getAvrSettings() {
		let response = await axios.get(routes.SETTINGS_ROUTE)
		this.setState({ avrSettings: response.data.result })
		console.log(response.data.result)
	}

	executeCommandWrapper(args) {
		this.executeCommand(args.command, args.commandParameter);
	}


	async executeCommand(command, commandParameter) {
		console.log(`executing: ${command} with paramter: ${commandParameter}`)
		await axios.post(routes.EXECUTE_ROUTE, { command, commandParameter })
		this.getAvrSettings()
	}

	render() {
		const allCommands = [
			<CommandButton name="Internet Radio" action={() => this.executeCommandWrapper({ command: commands.SET_INPUT, commandParameter: inputTypes.INTERNET_RADIO })} />,
			<CommandButton name="TV Audio" action={() => this.executeCommandWrapper({ command: commands.SET_INPUT, commandParameter: inputTypes.TV_AUDIO })} />,
			<CommandButton name="DVD" action={() => this.executeCommandWrapper({ command: commands.SET_INPUT, commandParameter: inputTypes.DVD })
			} />
		]
		return (
			<div className="container-fluid">

				<Container style={{
					display: "flex", flexDirection: "column",
					minHeight: "99vh"
				}}>
					{/* top row */}
					<Row>
						<Col xs={{ size: 1, offset: 11 }} style={{ marginTop: "40px" }}>
							<button className="unstyled-button" onClick={this.togglePower}>
								<PowerIcon />
							</button>
						</Col>
					</Row>

					<Row>
						<Col xs={{ size: 3 }} sm={{ size: 3 }}>
							{allCommands[0]}
						</Col>
						<Col xs={{ size: 3 }} sm={{ size: 3 }}>
							{allCommands[1]}
						</Col>
						<Col xs={{ size: 3 }} sm={{ size: 3 }}>
							{allCommands[2]}
						</Col>
					</Row>

					<div style={{ marginTop: "auto" }}>
						<Row className="wrapper">
							<Col xs={{ size: 12 }} style={{ marginBottom: "40px", }}>
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

export function CommandButton(props) {
	return (
		<button className="unstyled-button" onClick={props.action}>
			{props.name}
		</button>
	);
}