import React from "react";
import {Glyphicon, Table} from "react-bootstrap";
import Person from "./Person";
import Str from "../common/Str";
import Component from "../common/Component";
import Routes from "../../Routes";
import ErrorMessage from "../common/ErrorMessage";

export default class PersonsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onSelectPerson = this.onSelectPerson.bind(this);
    this.setPersons = this.setPersons.bind(this);
    this.search();
  }

  search() {

    let params = {};
    Person.search(params)
      .then(this.setPersons)
      .catch(this.onApiError);

  };

  setPersons(persons) {
    this.setState({
      persons: persons
    });
  }

  onSelectPerson(person) {
    this.navigate(Routes.person.person(person));
  }

  render() {

    return (
      <div>
        <h2>Owners</h2>

        <ErrorMessage message={this.state.errorMessage}/>

        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th className="col-md-9">Name</th>
            <th className="col-md-2 text-center">Date Of Birth</th>
            <th className="col-md-1"> </th>
          </tr>
          </thead>
          <tbody>

          {this.state.persons && this.state.persons.list.map((person) => {
            return (
              <tr key={person.key} onClick={this.fn(this.onSelectPerson, person)} className="clickable">
                <td>{person.name.fullName()}</td>
                <td className="text-center">{Str.formatDate(person.dateOfBirth)}</td>
                <td className="text-center"><Glyphicon glyph="chevron-right"/></td>
              </tr>
            );
          })}
          </tbody>
        </Table>

      </div>
    )
  }

}

