import React, { Component } from "react"
import { Row, Col } from 'reactstrap'
import axios from 'axios'

import CustomSlider from '../presenters/atoms/CustomSlider/CustomSlider'
import * as routes from '../utils/routes'

// icons
import { ReactComponent as PowerIcon } from '../assets/icons/power.svg'

import "./homePage.css";

export default class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			avrSettings: {
				masterVolume: 25
			}
		}
	}

	componentDidMount() {
		this.setState({ avrSettings: this.getAvrSettings() });
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			masterVolume
		} = this.state;

		if (prevState.avrSettings.masterVolume !== masterVolume) {
			console.log(`setting new volume to ${masterVolume}`)
			let response = await axios.post(routes.EXECUTE_ROUTE, {command: this.getVolumeCommand(masterVolume)})
			console.log(response.data)
		}
	}

	async getAvrSettings() {
		console.log('getting initial state of Denon')
		let response = await axios.get(routes.SETTINGS_ROUTE)
		console.log(response.data)

		return {};
	}

	getVolumeCommand = () => {
		// todo
	}

	render() {
		return (
			<div className="container-fluid">
				<Row>
					<Col xs={{ size: 1, offset: 1 }} sm={{ size: 1, offset: 1 }} lg={{ size: 1, offset: 5 }} >
						<button className="unstyled-button">
							<PowerIcon />
						</button>

						<CustomSlider value={this.state.avrSettings.masterVolume} />
					</Col>
				</Row>
			</div>
		)
	}
}