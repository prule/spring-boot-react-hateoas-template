import React from "react"

import Component from "../common/Component"
import PropTypes from "prop-types"

export default class Clickable {

    getClassNames = () => {
        return "clickable " + (this.props.className ? this.props.className : '')
    };

    render = () => {
        return (
            <span className={this.getClassNames()} onClick={this.props.onClick} style={{display: "inline-block", width: "100%"}}>
                {this.props.children}
            </span>
        )
    }
}

Clickable.propTypes = {
    onClick: PropTypes.func,
    classNames: PropTypes.string,
};