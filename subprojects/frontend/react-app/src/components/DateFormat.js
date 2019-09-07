// @flow

import React from "react"
import Spinner from "react-bootstrap/Spinner"

import Component from "../common/Component"
import DateFormatter from "../common/DateFormatter"
import PropTypes from "prop-types"
import Clickable from "./Clickable"
import {DateTime} from "luxon"

export default class DateFormat extends Component {

    getValue: string = () => {
        const value = this.props.value
        if (value) {
            let dateFormatter = new DateFormatter(this.props.value)
            return dateFormatter.toString()
        }
        return null
    }

    getAltValue: string = () => {
        const value: string = this.props.value
        const altZone: string = this.props.altZone

        if (value && altZone) {
            let dateFormatter = new DateFormatter(value, altZone)
            return dateFormatter.toString()
        }
        return null
    }

    render() {
        const value = this.getValue()
        const altValue = this.getAltValue()

        return (
            <div title={altValue}>
                {!!value && value}
                {!value && <Spinner animation="grow" size="sm"/>}
            </div>
        )
    }
}

DateFormat.propTypes = {
    value: PropTypes.object,
    altZone: PropTypes.string,
}