import React from "react";
import {Button, ButtonToolbar, Col, ControlLabel, Form, FormControl, FormGroup, Row} from "react-bootstrap";

import Component from "../common/Component";
import ErrorMessage from "../common/ErrorMessage";
import InputDatePicker from "../components/InputDatePicker";

import Routes from "../../Routes";
import Pet from "../pet/Pet";
import Person from "./Person";

import "react-datepicker/dist/react-datepicker.css";

export default class PersonPetPage extends Component {

  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
    this.setPerson = this.setPerson.bind(this);
    this.setPet = this.setPet.bind(this);
    this.onSave = this.onSave.bind(this);

  }

  componentDidMount() {
    this.load(this.props.match.params.personKey, this.props.match.params.petKey);
  }

  load(personKey, petKey) {

    Person.find(personKey)
      .then(this.setPerson)
      .then((person) => {
        if (petKey === 'new') {
          let newPet = new Pet();
          newPet.owner = person;
          this.setPet(newPet);
        } else {
          Pet.find(petKey)
            .then(this.setPet)
            .catch(this.onApiError);
        }
      })
      .catch(this.onApiError);

  }

  onCancel() {
    this.navigate(Routes.person.person(this.state.person));
  }

  onSave() {
    this.clear();
    const pet = this.state.pet;
    const person = this.state.person;

    pet.save()
      .then(this.setPet)
      .then(() => this.navigate(Routes.person.person(person)))
      .catch(this.onApiError);
  };

  setPerson(person) {
    this.setState({person: person});
    return person;
  }

  setPet(pet) {
    this.setState({pet: pet});
    return pet;
  }

  render() {

    const pet = this.state.pet;

    return (
      <div>
        <h2>Pet</h2>

        <ErrorMessage message={this.state.errorMessage}/>

        {pet &&
        <Form horizontal>
          <FormGroup controlId="petName" validationState={this.getValidationState('name')}>
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Name" value={pet.name.name} name="pet.name.name" onChange={this.onChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="petDateOfBirth" validationState={this.getValidationState('dateOfBirth')}>
            <Col componentClass={ControlLabel} sm={2}>
              Date of Birth
            </Col>
            <Col sm={10}>
              <InputDatePicker className="form-control" value={pet.dateOfBirth} name="pet.dateOfBirth" onChange={this.onChange}/>
            </Col>
          </FormGroup>

          <Row>
            <Col sm={10} smPush={2}>
              <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.onSave}>Save</Button>
                <Button onClick={this.onCancel}>Cancel</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Form>
        }

      </div>
    )
  }

}

