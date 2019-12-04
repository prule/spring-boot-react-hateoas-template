import React from "react";
import {navigate} from "../common/PageUtil";
import Routes from "../Routes";
import history from "../history"

export default function Nav(props) {

  function onClick() {
    navigate(history, props.route);
  }

  return (
    <span onClick={onClick} style={{display: "inline-block", width: "100%"}}>
      {props.label}
    </span>
  )

}