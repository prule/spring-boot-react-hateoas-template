import React from "react";
import {Button, ButtonToolbar, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Row, Table} from "react-bootstrap";

import Str from "../common/Str";
import Component from "../common/Component";
import Routes from "../../Routes";
import ErrorMessage from "../common/ErrorMessage";
import InputDatePicker from "../components/InputDatePicker";

import Person from "./Person";

import "react-datepicker/dist/react-datepicker.css";
import InputAddress from "../components/InputAddress";

export default class PersonPage extends Component {

  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
    this.onSelectPet = this.onSelectPet.bind(this);
    this.onAddPet = this.onAddPet.bind(this);
    this.onSave = this.onSave.bind(this);
    this.setPerson = this.setPerson.bind(this);
    this.setPets = this.setPets.bind(this);
    this.loadPets = this.loadPets.bind(this);

    this.loadPerson(props.match.params.key);
  }

  loadPerson(key) {
    Person.find(key)
      .then(this.setPerson)
      .then(this.loadPets)
      .catch(this.onApiError);
  };

  loadPets(person) {
    if (person) {
      person.searchPets()
        .then(this.setPets)
        .catch(this.onApiError);
    }
  };

  onCancel() {
    this.navigate(Routes.person.persons());
  }

  onSave() {
    this.clear();
    let person = this.state.person;
    person.save()
      .then(this.setPerson)
      .then(() => this.navigate(Routes.person.persons()))
      .catch(this.onApiError);
  };

  onSelectPet(pet) {
    this.navigate(Routes.person.pet(this.state.person, pet));
  }

  onAddPet() {
    let person = this.state.person;
    this.navigate(Routes.person.pet(person, null));
  }

  setPerson(person) {
    this.setState({
      person: person
    });
    return person;
  }

  setPets(pets) {
    this.setState({
      pets: pets
    });
    return pets;
  }

  render() {

    const person = this.state.person;
    const pets = this.state.pets;

    return (
      <div>
        <h2>Owner</h2>
        <br/>

        <ErrorMessage message={this.state.errorMessage}/>

        {person &&
        <div>
          <Form horizontal>

            <FormGroup controlId="personFirstName" validationState={this.getValidationState('firstName')}>
              <Col componentClass={ControlLabel} sm={2}>
                First name
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="First name" value={person.name.firstName} name="person.name.firstName" onChange={this.onChange}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="personLastName" validationState={this.getValidationState('lastName')}>
              <Col componentClass={ControlLabel} sm={2}>
                Last name
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Last name" value={person.name.lastName} name="person.name.lastName" onChange={this.onChange}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="personDateOfBirth" validationState={this.getValidationState('dateOfBirth')}>
              <Col componentClass={ControlLabel} sm={2}>
                Date of Birth
              </Col>
              <Col sm={10}>
                <InputDatePicker className="form-control" value={person.dateOfBirth} name="person.dateOfBirth" onChange={this.onChange}/>
              </Col>
            </FormGroup>

            <InputAddress value={person.address}/>

            <Row>
              <Col sm={10} smPush={2}>
                <ButtonToolbar>
                  <Button bsStyle="primary" onClick={this.onSave}>Save</Button>
                  <Button onClick={this.onCancel}>Cancel</Button>
                </ButtonToolbar>
              </Col>
            </Row>

          </Form>

          <h2>Pets</h2>

          <Row>
            <Col sm={10} smPush={2}>

              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th className="col-md-7">Name</th>
                  <th className="col-md-2 text-center">Date Of Birth</th>
                  <th className="col-md-1"></th>
                </tr>
                </thead>
                <tbody>

                {pets && pets.list.map((pet) => {
                  return (
                    <tr key={pet.key} onClick={this.fn(this.onSelectPet, pet)} className="clickable">
                      <td>{pet.name.fullName()}</td>
                      <td className="text-center">{Str.formatDate(pet.dateOfBirth)}</td>
                      <td className="text-center"><Glyphicon glyph="chevron-right"/></td>
                    </tr>
                  );
                })}

                </tbody>
              </Table>

            </Col>
          </Row>

          <Row>
            <Col sm={10} smPush={2}>
              <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.onAddPet}>Add</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </div>
        }

      </div>
    )
  }

}

