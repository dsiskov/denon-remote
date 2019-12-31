import React, { Component } from "react"
import { Row, Col, Container } from 'reactstrap'
import axios from 'axios'

import Slider from 'react-input-slider';
import * as routes from '../utils/routes'
import * as commands from '../utils/commands'
import * as inputTypes from '../utils/inputs'
import "./homePage.css";
import _ from 'lodash';

import { ReactComponent as PowerOnIcon } from '../assets/icons/powerOn.svg'
import { ReactComponent as PowerOffIcon } from '../assets/icons/powerOff.svg'
import { ReactComponent as VolumeOffIcon } from '../assets/icons/volumeOff.svg'
import { ReactComponent as VolumeOnIcon } from '../assets/icons/volumeOn.svg'

const searchDebounceTimeInMs = 50;

export default class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			avrSettings: {
				masterVolume: 25,
				power: 'STANDBY',
				mute: false
			},
			newVolumne: 25
		}

		this.debouncedOnChange = _.debounce(() => this.setNewVolume(), searchDebounceTimeInMs);
	}

	componentDidMount() {
		this.getAvrSettings(true)
	}

	togglePower = () => {
		console.log('power')
		const commandParameter = this.state.avrSettings.power === 'STANDBY' ? 'ON' : 'OFF';
		console.log(commandParameter);
		this.executeCommand(commands.TOGGLE_POWER, commandParameter)
		//this.setState({ avrSettings: { power: commandParameter } })
	}

	toggleMute = () => {
		const commandParameter = this.state.avrSettings.mute === false ? "on" : "off";
		console.log(`mute ${commandParameter}`)
		this.setState({ avrSettings: { mute: commandParameter } })
		this.executeCommand(commands.TOGGLE_MUTE, commandParameter)
	}

	setNewVolume = () => {
		console.log(`setting new volume: ${this.state.newVolume}`)
		this.executeCommand(commands.SET_VOLUME, this.state.newVolume)
	}

	async getAvrSettings(getVolume) {
		let response = await axios.get(routes.SETTINGS_ROUTE)
		this.setState({ avrSettings: response.data.result })
		if (getVolume) {
			this.setState({ newVolume: response.data.result.masterVolume })
		}

		console.log(response.data.result)
	}

	executeCommandWrapper(args) {
		this.executeCommand(args.command, args.commandParameter)
		//this.setState({ avrSettings: { selection: args.displayName } })
	}

	async executeCommand(command, commandParameter) {
		console.log(`executing: ${command} with paramter: ${commandParameter}`)
		await axios.post(routes.EXECUTE_ROUTE, { command, commandParameter })
		this.getAvrSettings(false)
	}

	render() {
		const allCommands = [
			<CommandButton displayname="NETWORK" selection={this.state.avrSettings.selection} name="Internet Radio" action={() => this.executeCommandWrapper({ command: commands.SET_INPUT, commandParameter: inputTypes.FIP, displayName: "NETWORK" })} />,
			<CommandButton displayname="TV AUDIO" selection={this.state.avrSettings.selection} name="TV Audio" action={() => this.executeCommandWrapper({ command: commands.SET_INPUT, commandParameter: inputTypes.TV_AUDIO, displayName: "TV AUDIO" })} />,
			<CommandButton displayname="DVD" selection={this.state.avrSettings.selection} name="DVD" action={() => this.executeCommandWrapper({ command: commands.SET_INPUT, commandParameter: inputTypes.DVD, displayName: "DVD" })
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
						<Col xs={{ size: 1, offset: 11 }} style={{ marginTop: "40px", marginRight: "20px" }}>
							<button className="unstyled-button" onClick={this.togglePower}>
								{this.state.avrSettings.power === 'STANDBY' ? <PowerOffIcon /> : <PowerOnIcon />}
							</button>
						</Col>
					</Row>

					<Row style={{ marginTop: "100px" }} >
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
							<Col xs={{ size: 12 }} style={{ marginBottom: "40px" }}>
								<div className="form-inline" style={{ position: "fixed", left: "50%" }}>
									<button className="unstyled-button" onClick={this.toggleMute}>
										{this.state.avrSettings.mute === true ? <VolumeOffIcon /> : <VolumeOnIcon />}
									</button>
									<span style={{ "font-weight": "bold" }}>
										{this.state.newVolume}
									</span>
								</div>
							</Col>
						</Row>
						<Row className="wrapper">
							<Col xs={{ size: 12 }} style={{ marginBottom: "40px", }}>
								<Slider
									style={{ width: "100%" }}
									axis="x"
									x={this.state.newVolume}
									onChange={({ x }) => {
										this.debouncedOnChange();
										this.setState({ newVolume: x });
									}}
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
			<span style={{ "font-weight": props.selection === props.displayname ? "bold" : "normal" }}>
				{props.name}
			</span>
		</button>
	);
}