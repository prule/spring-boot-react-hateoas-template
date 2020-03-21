import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";

export default class HomePage extends Component {

  render() {
    return (
      <div>
        <h1>Pet and Owner Sample Application</h1>
        <p>
          This is a sample application (which is still a work in progress) which demonstrates basic capability using:
        </p>
        <ul>
          <li>Java, Spring-Boot, JPA, HATEOAS</li>
          <li>React.js, JavaScript</li>
          <li>Gradle, Intellij IDEA, Bootstrap</li>
        </ul>
        <p>Click the "Owners" menu item in the navigation bar above to get started.</p>
      </div>
    );
  }
}